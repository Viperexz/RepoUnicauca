import React, { useState } from 'react';
import './css/App.css';
import ButtonComponent from "./components/general/buttonComponent";
import InputField from "./components/general/inputField";
import { FaRegUser } from 'react-icons/fa';
import { MdLockOutline } from "react-icons/md";
import Unicauca from './img/logo/Unicauca.jpg';
import Dev from './img/logo/Dev.jpg';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    navigate('/coordinador', { state: { username, password } });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="containerLogo">
          <div className={"subSection"}>
            <p>Powered by:</p>
            <img src={Dev} alt="Logo" style={{ width: '20%' }} />
          </div>
          <img src={Unicauca} alt="Logo" style={{ width: '65%' }} />
        </div>
        <div className="containerLogin">
          <img className={'hiddenLogo'} src={Unicauca} alt="Logo" style={{ width: '75%' }} />
          <h1 className={"Titulo"}>Iniciar Sesion</h1>
          <div>
            <form onSubmit={handleLogin}>
              <InputField
                placeholder="Usuario"
                icon={<FaRegUser />}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                placeholder="Contraseña"
                icon={<MdLockOutline />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ButtonComponent title="Iniciar Sesion" type="submit" />
            </form>
            <p> Olvidaste tu contraseña?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;