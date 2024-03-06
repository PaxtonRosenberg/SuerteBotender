import botenderLogo from './assets/suerte-botender-logo.svg';
import Form from './components/Form';
import Recipe from './components/Recipe';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/AppContext';
import { useState } from 'react';
import { Drinks } from './lib/api.ts';

export default function App() {
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [ingredients, setIngredients] = useState<string>(''); //Entire Ingredients Box
  const [ingredientsList, setIngredientsList] = useState<string[]>([]); //List of individual ingredients
  const [randomDrink, setRandomDrink] = useState({});
  const [tequila, setTequila] = useState('');

  const navigate = useNavigate();

  async function getRecipe() {
    // const openai = new OpenAI();
    // try {
    //   const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${process.env.TOKEN_SECRET}`,
    //     },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }

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
