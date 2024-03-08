import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

export default function Recipe() {
  const navigate = useNavigate();

  const {
    isLoading,
    pantryInput,
    generatedDrink,
    setPantryInput,
    setTequila,
    setGeneratedDrink,
    setIsLoading,
  } = useContext(AppContext);

  /**
   * Navigate to form if refresh before drink is generated
   */

  useEffect(() => {
    const json = localStorage.getItem('drink');
    if (json) {
      const parsed = JSON.parse(json);
      if ('name' in parsed && parsed.name) {
        setGeneratedDrink(parsed);
        setIsLoading(false);
      } else {
        navigate('/');
      }
    } else {
      if (!pantryInput) {
        navigate('/');
      }
    }
  }, []);

  function renderIngredients() {
    const result = generatedDrink.ingredients.map((ingredient, index) => {
      return <li key={index}>{ingredient}</li>;
    });
    return <ul>{result}</ul>;
  }

  function renderInstructions() {
    const result = generatedDrink.instructions.map((instruction, index) => {
      return <li key={index}>{instruction}</li>;
    });
    return <ul>{result}</ul>;
  }

  function handleClick() {
    navigate('/');
    setTequila('');
    setPantryInput('');
    setGeneratedDrink({ name: '', ingredients: [], instructions: [] });
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
            <a
              className="instagramLink"
              href="https://www.instagram.com/suertetequila/?hl=en">
              {' '}
              @suertetequila
            </a>
            . Cheers to virtual cheers!
          </p>
        </div>
      </div>
    </div>
  );
}
