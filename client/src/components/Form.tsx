import { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

export default function Form() {
  const {
    getRecipe,
    setPantryInput,
    setTequila,
    setIsLoading,
    setGeneratedDrink,
  } = useContext(AppContext);

  useEffect(() => {
    localStorage.removeItem('drink');
    setGeneratedDrink({ name: '', ingredients: [], instructions: [] });
    setPantryInput('');
    setIsLoading(true);
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    getRecipe();
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
          <option value="Suerte Tequila Blanco Still Strength">
            Suerte Tequila Blanco Still Strength
          </option>
          <option value="Suerte Tequila Extra Anejo">
            Suerte Tequila Extra Anejo
          </option>
        </select>
        <p className="formText">
          LIST ALL OF THE OTHER INGREDIENTS YOU HAVE ON HAND
        </p>
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
