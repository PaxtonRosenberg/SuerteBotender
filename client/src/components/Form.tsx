import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

export default function Form() {
  const navigate = useNavigate();
  // const [tequila, setTequila] = useState<Drinks[]>([]) //drinks with tequila
  // const [ingredients, setIngredients] = useState<string>(''); //Entire Ingredients Box
  // const [ingredientsList, setIngredientsList] = useState<string[]>([]); //List of individual ingredients

  const {
    getRecipe,
    ingredients,
    setIngredients,
    ingredientsList,
    setIngredientsList,
  } = useContext(AppContext);
  // fetch tequila drinks
  //   async function getTequilaDrinks() {
  //     try {
  //       const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila')
  //       const tequilaDrinks = await res.json();
  //       setTequila(tequilaDrinks.drinks);
  //     } catch(err) {
  //       console.error(err);
  //     }
  //   }

  // console.log('drinks with tequila:', tequila)

  useEffect(() => {
    // async function getRecipe() {
    //   try {
    //     // await getTequilaDrinks();

    //     /**
    //      * Select a random ingredient to look up drinks
    //      */
    //     const i = Math.floor(Math.random() * ingredientsList.length);
    //     const res = await fetch(
    //       `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURI(
    //         ingredientsList[i].trim()
    //       )}`
    //     );
    //     if (!res.ok) {
    //       throw new Error('API Issue');
    //     }

    //     let drinks;
    //     if (res.headers.get('content-type') == 'application/json') {
    //       drinks = await res.json();
    //       console.log('drinks', drinks)
    //     }
    //     /**
    //      * Select a random drink to look up recipe
    //      */
    //     let randDrink;
    //     if (drinks) {
    //       const i = Math.floor(Math.random() * drinks.drinks.length);
    //       const randID = drinks.drinks[i].idDrink;
    //       const res = await fetch(
    //         `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randID}`
    //       );
    //       randDrink = await res.json();
    //       if (!res.ok) {
    //         throw new Error('API Issue');
    //       }
    //     }

    //     // Ingredients
    //     console.log(randDrink)
    //     for (
    //       let i = 1;
    //       randDrink.drinks[0][`strIngredient${i}`] !== null && i <= 15;
    //       i++
    //     ) {
    //       console.log('ingredients', randDrink.drinks[0][`strIngredient${i}`]);
    //     }

    //     //Instructions
    //     console.log(randDrink.drinks[0].strInstructions);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // navigate('/recipe'); //Navigates to Recipe route after retrieving recipe
    // }

    if (ingredientsList && ingredients.length > 0) {
      getRecipe();
    }
  }, [ingredientsList, navigate]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setIngredientsList(ingredients.split(',')); //State setter triggers Recipe Lookup
  }
  return (
    <div className="formBox">
      <form onSubmit={handleSubmit}>
        <p className="formText">WHICH TEQUILA ARE WE USING TODAY?</p>
        <select required id="tequilaType" className="tequilaTypeDropDown">
          <option value="">Select Tequila</option>
          <option value="Suerte Tequila A&ntilde;ejo">
            Suerte Tequila A&ntilde;ejo
          </option>
          <option value="Suerte Tequila Reposado">
            Suerte Tequila Reposado
          </option>
          <option value="Suerte Tequila Blanco">Suerte Tequila Blanco</option>
          <option value="Suerte Tequila Gold">Suerte Tequila Gold</option>
        </select>
        <p className="formText">LIST OTHER INGREDIENTS YOU HAVE ON HAND</p>
        <textarea
          required
          id="ingredients"
          onChange={(e) => setIngredients(e.currentTarget.value)}
          placeholder="Enter other ingredients"></textarea>
        <div className="submitButtonBox">
          <button>MAKE A DRINK</button>
        </div>
      </form>
    </div>
  );
}
