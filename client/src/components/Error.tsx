import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }
  return (
    <>
      <div className="errorBoxHeader">
        <p className="textAlignLeft">ERROR</p>
      </div>
      <div className="errorBox">
        Uh oh. Looks like the tequila took over and now we need a quick siesta
        to set things straight. Please hit the 'BACK' button while the the
        Suerte Botender sobers up for round two. ¡Salud!
      </div>
      <button onClick={handleClick}>BACK</button>
    </>
  );
}
