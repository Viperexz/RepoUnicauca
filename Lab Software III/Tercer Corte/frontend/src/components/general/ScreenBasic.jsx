// src/components/menu.jsx
import React from 'react';
import '../../css/components/general/ScreenBasic.css';
import Dev from "../../img/logo/Dev.jpg";
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { TbMedal2 } from "react-icons/tb";
import { FiBookOpen, FiUsers  } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import routes from "../../routes";

function ScreenBasic({ rol, Title = 'Title', children }) {
    const navigate = useNavigate();
    const menuItems = rol === 1 ? [
        { icon: <TbMedal2 />, label: 'Competencias y RA por Programa', route: '/coordinador/RAP' },
        { icon: <FiBookOpen />, label: 'Asignaturas', route: '/coordinador/asignaturas' },
        { icon: <FiUsers />, label: 'Docentes', route: '/coordinador/docentes' },
        { icon: <TbMedal2 />, label: 'Competencias y RA por Asignatura', route: '/coordinador/RAA' }
    ] : [
        { icon: <FaHome />, label: 'Test 4', route: '/test4' },
        { icon: <FaUser />, label: 'Test 5', route: '/test5' },
        { icon: <FaCog />, label: 'Test 6', route: '/test6' }
    ];

    const handleNavigation = (route) => navigate(route);

    return (
        <div className="baseContainer">
            <div className="menu">
                {/* Foto de Usuario */}
                <div className="userData">
                    <img src={Dev} alt="Logo de Usuario"/>
                    <p className="nombreUsuario">Oscar Hoyos</p>
                    <p className="rolUsuario">Coordinador</p>
                </div>

                {/* Opciones de Menú */}
                <div className="menuOptions">
                    {menuItems.map((item, index) => (
                        <button key={index} className="menuButton" onClick={() => handleNavigation(item.route)}>
                            <span className="icon">{item.icon}</span>
                            <p className="etiquetaBoton">{item.label}</p>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="menuFooter">
                    <FaHome className="homeButton"
                            onClick={() => handleNavigation(rol === 1 ? '/coordinador' : '/docente')}/>
                    <p className="cerraSesion" onClick={() => console.log('Cerrar Sesión')}>Cerrar Sesión</p>
                </div>
        </div>
    <div className="dashContainer">
        <div className="containerTitle">
            <h1>{Title}</h1>
        </div>
        {children}
    </div>
</div>
)
    ;
}

export default ScreenBasic;
