import { useNavigate } from 'react-router-dom';
// import { createContext } from 'react';

import { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

export default function Recipe() {
  const navigate = useNavigate();

  const { setPantryInput, setPantry, setGeneratedDrink } =
    useContext(AppContext);

  useEffect(() => {}, []);

  function renderIngredients() {
    return <></>;
  }

  function handleClick() {
    navigate('/');
    setPantryInput('');
    setPantry([]);
    setGeneratedDrink({});
    localStorage.removeItem('drink');
  }

  return (
    <>
      <div className="recipeContainer">
        <div className="recipeHeader">
          <p>Recipe:</p>
        </div>
        <div className="ingredientBox">
          <p>Ingredients:</p>
          {renderIngredients()}
        </div>
        <div className="instructionsBox">
          <p>Instructions:</p>
          <ul></ul>
        </div>
        <div className="secondRoundButtonBox">
          <button onClick={handleClick}>SECOND ROUND</button>
        </div>
        <div className="shareCreationTextContainer">
          <div className="shareCreationTextBox">
            <p>
              Mix, snap, sip, and share your Botender masterpiece on social
              media with the hashtag #suertebotender. And don't forget to tag
              @suertetequila. Cheers to virtual cheers!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
