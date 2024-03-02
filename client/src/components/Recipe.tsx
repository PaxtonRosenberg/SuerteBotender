import { useNavigate } from 'react-router-dom';
// import { createContext } from 'react';

import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Recipe() {
  const navigate = useNavigate();

  const { setIngredients, setIngredientsList, setRandomDrink } =
    useContext(AppContext);

  function renderIngredients() {
    let drink;

    const json = localStorage.getItem('drink');
    if (json) {
      drink = JSON.parse(json);
    }
    console.log(drink);
    const ingArr: string[] = [];
    const measureArr: string[] = [];
    for (
      let i = 1;
      drink.drinks[0][`strIngredient${i}`] !== null && i <= 15;
      i++
    ) {
      const ing = drink.drinks[0][`strIngredient${i}`];
      ingArr.push(ing);
      const measure = drink.drinks[0][`strMeasure${i}`];
      measureArr.push(measure);
    }
    const list = ingArr.map((ingredient, index) => {
      return <li key={index}>{`${measureArr[index]} ${ingredient}`}</li>;
    });
    return <ul>{list}</ul>;
  }

  let drink;

  const json = localStorage.getItem('drink');
  if (json) {
    drink = JSON.parse(json);
  }

  const instructionsArr = drink.drinks[0][`strInstructions`].split('\r\n');

  const instructionList = instructionsArr.map((instruction, index) => {
    return <li key={index}>{instruction}</li>;
  });

  function handleClick() {
    navigate('/');
    setIngredients('');
    setIngredientsList([]);
    setRandomDrink({});
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
          <ul>{instructionList}</ul>
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
