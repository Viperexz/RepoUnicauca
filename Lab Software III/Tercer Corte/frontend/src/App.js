// src/App.js
import './css/App.css';
import ButtonComponent from "./components/buttonComponent";
import InputField from "./components/inputField";
import { FaRegUser } from 'react-icons/fa';
import { MdLockOutline } from "react-icons/md";
import Unicauca from './img/logo/Unicauca.jpg'; // Importa la imagen
import Dev from './img/logo/Dev.jpg'; // Importa la imagen

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="containerLogo">
          <div className={"subSection"}>
            <p>Powered by:</p>
            <img src={Dev} alt="Logo" style={{ width: '20%' }} /> {/* Muestra la imagen */}
          </div>


          <img src={Unicauca} alt="Logo" style={{ width: '65%' }} /> {/* Muestra la imagen */}

        </div>
        <div className="containerLogin">
          <img className={'hiddenLogo'}  src={Unicauca} alt="Logo" style={{ width: '75%' }} /> {/* Muestra la imagen */}

          <h1 className={"Titulo"} >Iniciar Sesion</h1>
          <div>
            <InputField placeholder="Usuario" icon={<FaRegUser />} type="text" />
            <InputField placeholder="Contraseña" icon={<MdLockOutline />} type="password" />
            <ButtonComponent title="Iniciar Sesion" />
            <p> Olvidaste tu contraseña?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;