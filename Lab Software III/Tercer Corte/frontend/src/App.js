import React, { useContext, useState } from 'react';
import './css/App.css';
import ButtonComponent from "./components/general/buttonComponent";
import InputField from "./components/general/inputField";
import { FaRegUser } from 'react-icons/fa';
import { MdLockOutline } from "react-icons/md";
import Unicauca from './img/logo/Unicauca.jpg';
import Dev from './img/logo/Dev.jpg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./components/Contexto/UsuarioContext";
import dataServices from './services/dataServices';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);


    if(username === 'admin'){
      setUser({ numIdUsuario: '123', nombreUsuario: 'Juan', apellidoUsuario: 'Perez', correoUsuario: 'test@test.com',rol: 1});
      navigate('/coordinador', { state: { username, password } });
    }
    else {
      setUser({ numIdUsuario: '123', nombreUsuario: 'Juan', apellidoUsuario: 'Perez', correoUsuario: 'test@test.com',rol: 0});
      navigate('/docente', { state: { username, password } });
    }

    /*try {
      const credentials = { email: username, password: password };
      const response = await dataServices.login(credentials); // Use the dataServices instance
      setUser(response);
      navigate('/coordinador', { state: { username, password } });
    } catch (error) {
      console.error('Error during login', error);
      // Handle login error (e.g., show an error message to the user)
    }*/
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