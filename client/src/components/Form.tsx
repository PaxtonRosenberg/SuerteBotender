import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

export default function Form() {
  const navigate = useNavigate();

  const {
    getRecipe,
    pantryInput,
    setPantryInput,
    pantry,
    setPantry,
    setTequila,
  } = useContext(AppContext);

  useEffect(() => {
    if (pantry && pantry.length > 0) {
      getRecipe();
    }
  }, [pantry, navigate]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setPantry(pantryInput.split(',')); //State setter triggers Recipe Lookup
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
          onChange={(e) => setPantryInput(e.currentTarget.value)}
          placeholder="Enter other ingredients"></textarea>
        <div className="submitButtonBox">
          <button>MAKE A DRINK</button>
        </div>
      </form>
    </div>
  );
}
