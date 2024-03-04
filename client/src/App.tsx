import botenderLogo from './assets/suerte-botender-logo.svg';
import Form from './components/Form';
import Recipe from './components/Recipe';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/AppContext';
import { useState } from 'react';
import { Drinks } from './lib/api.ts';
// import OpenAI from "openai";

export default function App() {
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [ingredients, setIngredients] = useState<string>(''); //Entire Ingredients Box
  const [ingredientsList, setIngredientsList] = useState<string[]>([]); //List of individual ingredients
  const [randomDrink, setRandomDrink] = useState({});
  const [tequila, setTequila] = useState('');

  const navigate = useNavigate();

  // console.log(process.env.TOKEN_SECRET)
  // const openai = new OpenAI();

  // async function main() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices[0]);
  // }

  // main();

  async function getTequilaDrinks() {
    try {
      const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila'
      );
      const tequilaDrinks = await res.json();
      setTequila(tequilaDrinks);
    } catch (err) {
      console.error(err);
    }
  }

  console.log('tequila', tequila);

  async function getRecipe() {
    try {
      await getTequilaDrinks();
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
        setDrinks(drinks);
        // console.log('drinks', drinks)
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
        localStorage.setItem('drink', JSON.stringify(randDrink));
        setRandomDrink(randDrink);
        if (!res.ok) {
          throw new Error('API Issue');
        }
      }
    } catch (err) {
      console.error(err);
    }

    navigate('/recipe'); //Navigates to Recipe route after retrieving recipe
  }
  const contextValue = {
    drinks,
    ingredients,
    ingredientsList,
    randomDrink,
    tequila,
    setIngredients,
    setIngredientsList,
    setRandomDrink,
    setTequila,
    getRecipe,
    getTequilaDrinks,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <div className="container">
          <img src={botenderLogo} className="logo" alt="Suerte Botender Logo" />
          <Routes>
            <Route path="/" element={<Form />}></Route>
            <Route path="/recipe" element={<Recipe />}></Route>
          </Routes>
          <footer>
            <p>
              Disclaimer: The Suerte Botender's here to suggest cocktails based
              on your ingredients, but let's be clear—it's not as great as a
              real mixologist. If your drink doesn't hit the mark, it's not the
              Botender’s fault. Enjoy responsibly and remember, it's just a
              digital recipe bot. Good luck!
            </p>
          </footer>
        </div>
      </AppContext.Provider>
    </>
  );
}
