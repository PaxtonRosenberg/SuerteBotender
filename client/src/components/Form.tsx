import { useNavigate } from 'react-router-dom';

export default function Form() {
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    navigate('/recipe');
  }
  return (
    <div className="formBox">
      <form onSubmit={handleSubmit}>
        <p className="formText">WHICH TEQUILA ARE WE USING TODAY?</p>
        <select required id="tequilaType" className="tequilaTypeDropDown">
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
          placeholder="Enter other ingredients"></textarea>
        <div className="submitButtonBox">
          <button>MAKE A DRINK</button>
        </div>
      </form>
    </div>
  );
}
