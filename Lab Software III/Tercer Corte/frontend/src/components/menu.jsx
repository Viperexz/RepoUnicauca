// src/components/menu.jsx
import React from 'react';
import '../css/components/menu.css';
import Dev from "../img/logo/Dev.jpg";
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { TbMedal2 } from "react-icons/tb";
import { FiBookOpen, FiUsers  } from "react-icons/fi";

function Menu({ rol }) {
    const menuItems = rol === 1 ? [
        { icon: <TbMedal2 />, label: 'Competencias y RA por Programa' },
        { icon: <FiBookOpen />, label: 'Asignaturas' },
        { icon: <FiUsers />, label: 'Docentes' },
        { icon: <TbMedal2 />, label: 'Comepencias y RA por Asignatura' }
    ] : [
        { icon: <FaHome />, label: 'Test 4' },
        { icon: <FaUser />, label: 'Test 5' },
        { icon: <FaCog />, label: 'Test 6' }
    ];

    return (
        <div className="menu">
            <div className={'userData'}>
                <img src={Dev} alt="Logo" style={{width: '100%'}}/> {/* Muestra la imagen */}
                <p className={'nombreUsuario'}>Nombre</p>
                <p className={'rolUsusario'}>Rol</p>
            </div>
            <div className={'menuOptions'}>
            {menuItems.map((item, index) => (
                <button key={index} className={'menuButton'}>
                    <span className="icon">{item.icon}</span>
                    <p className={'etiquetaBoton'}>{item.label}</p>
                </button>
            ))}
            </div>
        </div>
    );
}

export default Menu;