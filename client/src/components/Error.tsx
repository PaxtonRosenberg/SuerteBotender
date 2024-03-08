import { useNavigate } from 'react-router-dom';

type ErrorProps = {
  errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }
  return (
    <>
      {' '}
      {errorMessage !== '' ? (
        <>
          <div className="errorBox">{errorMessage}</div>
          <button onClick={handleClick}>BACK</button>
        </>
      ) : (
        <>
          <div className="errorBox">
            I'm sorry, I was not able to create a drink using those ingredients.
            Please try again.
          </div>
          <button onClick={handleClick}>BACK</button>
        </>
      )}
    </>
  );
}
