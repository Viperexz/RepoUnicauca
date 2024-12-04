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

  try {
    const credentials = { email: username, password: password };
    const response = await dataServices.login(credentials); // Use the dataServices instance

    const userData = {
      numIdUsuario: response.id,
      nombreUsuario: response.email.split('@')[0], // Assuming the name is the part before the @
      apellidoUsuario: '', // No last name in the JSON, set it as empty
      correoUsuario: response.email,
      token: response.accessToken,
      rol: response.roles.includes('ROLE_COORDINADOR') ? 1 : 0 // Assuming 1 for coordinador, 0 for others
    };

    setUser(userData);

    if (userData.rol === 1) {
      navigate('/coordinador', { state: { username, password } });
    } else {
      navigate('/docente', { state: { username, password } });
    }
  } catch (error) {
    console.error('Error during login', error);
    // Handle login error (e.g., show an error message to the user)
  }
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
                required = {true}
              />
              <InputField
                placeholder="Contraseña"
                icon={<MdLockOutline />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required = {true}
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