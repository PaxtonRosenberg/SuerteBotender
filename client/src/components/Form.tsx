import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Form() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string>(''); //Entire Ingredients Box
  const [ingredientsList, setIngredientsList] = useState<string[]>([]); //List of individual ingredients

  useEffect(() => {
    console.log('ingredientsList', ingredientsList);
    async function getRecipe() {
      try {
        /**
         * Select a random ingredient to look up drinks
         */
        const i = Math.floor(Math.random() * ingredientsList.length);
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURI(
            ingredientsList[i].trim()
          )}`
        );
        if (!res.ok) {
          throw new Error('API Issue');
        }
        let drinks;
        if (res.headers.get('content-type') == 'application/json') {
          drinks = await res.json();
        }
        /**
         * Select a random drink to look up recipe
         */
        let randDrink;
        if (drinks) {
          const i = Math.floor(Math.random() * drinks.drinks.length);
          const randID = drinks.drinks[i].idDrink;
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randID}`
          );
          randDrink = await res.json();
          if (!res.ok) {
            throw new Error('API Issue');
          }
        }

        // Ingredients
        for (
          let i = 1;
          randDrink.drinks[0][`strIngredient${i}`] !== null;
          i++
        ) {
          console.log(randDrink.drinks[0][`strIngredient${i}`]);
        }
        console.log();

        //Instructions
        console.log(randDrink.drinks[0].strInstructions);
      } catch (err) {
        console.log(err);
      }
      navigate('/recipe'); //Navigates to Recipe route after retrieving recipe
    }

    if (ingredientsList.length > 0) {
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
