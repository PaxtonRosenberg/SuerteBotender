import botenderLogo from './assets/suerte-botender-logo.svg';
import Form from './components/Form';
import Recipe from './components/Recipe';
import { Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <>
      <div className="container">
        <img src={botenderLogo} className="logo" alt="Suerte Botender Logo" />
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
        </Routes>
        <footer>
          <p>
            Disclaimer: The Suerte Botender's here to suggest cocktails based on
            your ingredients, but let's be clear—it's not as great as a real
            mixologist. If your drink doesn't hit the mark, it's not the
            Botender’s fault. Enjoy responsibly and remember, it's just a
            digital recipe bot. Good luck!
          </p>
        </footer>
      </div>
    </>
  );
}
