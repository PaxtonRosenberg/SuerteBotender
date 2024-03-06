import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Recipe() {
  const navigate = useNavigate();

  const {
    isLoading,
    generatedDrink,
    setPantryInput,
    setPantry,
    setTequila,
    setGeneratedDrink,
    setIsLoading,
  } = useContext(AppContext);

  function renderIngredients() {
    return <>{generatedDrink.ingredients}</>;
  }

  function renderInstructions() {
    return <>{generatedDrink.instructions}</>;
  }

  function handleClick() {
    navigate('/');
    setTequila('');
    setPantryInput('');
    setPantry([]);
    setGeneratedDrink({ name: '', ingredients: '', instructions: '' });
    setIsLoading(true);
    localStorage.removeItem('drink');
  }

  if (isLoading) {
    return <p>Generating Recipe...</p>;
  }

  return (
    <div className="recipeContainer">
      <div className="recipeHeader">
        <p>Recipe: {generatedDrink.name}</p>
      </div>
      <div className="ingredientBox">
        <p>Ingredients:</p>
        {renderIngredients()}
      </div>
      <div className="instructionsBox">
        <p>Instructions:</p>
        {renderInstructions()}
      </div>
      <div className="secondRoundButtonBox">
        <button onClick={handleClick}>SECOND ROUND</button>
      </div>
      <div className="shareCreationTextContainer">
        <div className="shareCreationTextBox">
          <p>
            Mix, snap, sip, and share your Botender masterpiece on social media
            with the hashtag #suertebotender. And don't forget to tag
            @suertetequila. Cheers to virtual cheers!
          </p>
        </div>
      </div>
    </div>
  );
}
