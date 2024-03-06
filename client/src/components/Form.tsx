import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

export default function Form() {
  const navigate = useNavigate();

  const {
    getRecipe,
    ingredients,
    setIngredients,
    ingredientsList,
    setIngredientsList,
    setTequila,
  } = useContext(AppContext);

  // async function main() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
  //     model: 'gpt-4-0125-preview',
  //   });

  //   console.log('test', completion.choices[0]);
  // }

  useEffect(() => {
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
        <select
          required
          id="tequilaType"
          className="tequilaTypeDropDown"
          onChange={(e) => setTequila(e.currentTarget.value)}>
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
