import React, { useContext } from 'react';
import '../../css/components/general/ScreenBasic.css';
import Dev from "../../img/logo/Dev.jpg";
import { FaHome, FaUser, FaCheck } from 'react-icons/fa';
import { TbMedal2 } from "react-icons/tb";
import { FiBookOpen, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexto/UsuarioContext";

function ScreenBasic({ Title = 'Title', children }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const menuItems = user.rol === 1 ? [
        { icon: <TbMedal2 />, label: 'Competencias y RA por Programa', route: '/coordinador/RAP' },
        { icon: <FiBookOpen />, label: 'Asignaturas', route: '/coordinador/asignaturas' },
        { icon: <FiUsers />, label: 'Docentes', route: '/coordinador/docentes' },
        { icon: <TbMedal2 />, label: 'Competencias y RA por Asignatura', route: '/coordinador/RAA' }
    ] : [
        { icon: <TbMedal2 />, label: 'Competencias y RA por Asignatura', route: '/test4' },
        { icon: <FaCheck />, label: 'Rubricas', route: '/docente/rubricas' },
    ];

    const handleNavigation = (route) => {
        if (route === '/') {
            localStorage.removeItem('user');
            setUser({ numIdUsuario: '', nombreUsuario: '', apellidoUsuario: '', correoUsuario: '', token: '', rol: 0 });
        }
        navigate(route);
    };

    return (
        <div className="baseContainer">
            <div className="menu">
                <div className="userData">
                    <img src={Dev} alt="Logo de Usuario" />
                    <p className="nombreUsuario">{user.nombreUsuario} {user.apellidoUsuario}</p>
                    <p className="rolUsuario">{user.rol === 1 ? 'Coordinador' : 'Docente'}</p>
                </div>
                <div className="menuOptions">
                    {menuItems.map((item, index) => (
                        <button key={index} className="menuButton" onClick={() => handleNavigation(item.route)}>
                            <span className="icon">{item.icon}</span>
                            <p className="etiquetaBoton">{item.label}</p>
                        </button>
                    ))}
                </div>
                <div className="menuFooter">
                    <FaHome className="homeButton" onClick={() => handleNavigation(user.rol === 1 ? '/coordinador' : '/docente')} />
                    <p className="cerraSesion" onClick={() => handleNavigation('/')}>Cerrar Sesión</p>
                </div>
            </div>
            <div className="dashContainer">
                <div className="containerTitle">
                    <h1>{Title}</h1>
                </div>
                {children}
            </div>
        </div>
    );
}

export default ScreenBasic;