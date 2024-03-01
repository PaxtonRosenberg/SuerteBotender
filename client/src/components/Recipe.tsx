import { useNavigate } from 'react-router-dom';
// import { createContext } from 'react';

import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Recipe() {
  const navigate = useNavigate();

  const { randomDrink, setIngredients, setIngredientsList } =
    useContext(AppContext);

  function handleClick() {
    navigate('/');
    setIngredients('');
    setIngredientsList([]);
  }

  console.log(randomDrink);
  return (
    <>
      <div className="recipeContainer">
        <div className="recipeHeader">
          <p>Recipe:</p>
        </div>
        <div className="ingredientBox">
          <p>Ingredients:</p>
          <ul>
            <li>2 oz Suerte Blanco Tequila</li>
            <li>1 oz fresh lemon juice</li>
            <li>3/4 oz simple syrup (made with sugar & water)</li>
            <li>A handful of fresh blueberries</li>
            <li>Ice cubes</li>
          </ul>
        </div>
        <div className="instructionsBox">
          <p>Instructions:</p>
          <ul>
            <li>
              In a mixing gladd, muddle the fresh blueberries with the simple
              syrup.
            </li>
            <li>
              Add Suerte Blanco Tequila and fresh lemon juice to the mixing
              glass.
            </li>
            <li>
              Fill the mixing glass with ice and shake the ingredients well to
              chill the mixture.
            </li>
            <li>Strain the mixture into a rocks glass filled with ice.</li>
            <li>
              For a little extra flair, garnish with a few additional
              blueberries or a lemon twist.
            </li>
          </ul>
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
