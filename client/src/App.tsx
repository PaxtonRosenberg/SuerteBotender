import botenderLogo from './assets/suerte-botender-logo.svg';
import Form from './components/Form';
import Recipe from './components/Recipe';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/AppContext';
import { useState } from 'react';
import { Drink } from './lib/api.ts';

export default function App() {
  const [pantryInput, setPantryInput] = useState<string>(''); // User input
  const [pantry, setPantry] = useState<string[]>([]); //Parsed input to pantry list
  const [generatedDrink, setGeneratedDrink] = useState<Drink>({
    name: '',
    ingredients: '',
    instructions: '',
  });
  const [tequila, setTequila] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  async function getRecipe() {
    navigate('/recipe');
    localStorage.setItem('pantry', JSON.stringify(pantryInput));
    localStorage.setItem('tequila', JSON.stringify(tequila));
    const res = await fetch('/api/botender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tequila: tequila,
        ingredients: pantryInput.trim(),
      }),
    });
    const drink = await res.json();
    console.dir(drink.choices[0].message.content);
    setIsLoading(false);
  }

  const contextValue = {
    pantryInput,
    pantry,
    generatedDrink,
    tequila,
    isLoading,
    setPantryInput,
    setPantry,
    setGeneratedDrink,
    setTequila,
    getRecipe,
    setIsLoading,
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
