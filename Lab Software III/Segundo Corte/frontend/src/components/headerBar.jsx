// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../assets/css/HeaderBar.css';
export default function headerBar() {
    return (
        <header className={'Header'}>
            <div className={'logo'}>
                <img className={'imgHeader'}
                     src={'https://www.unicauca.edu.co/wp-content/uploads/2023/11/Logo-Unicauca-Azul@3x.png'} alt={'Ironhack logo'} height={'55'}/>
                <h3>CRUD Productos</h3>
            </div>
            <nav className={'Nav'}>
                <a className={'item-nav'} href={'#'}>Inicio</a>
                <a className={'item-nav'} href={'#'}>Productos</a>
                <a className={'item-nav'} href={'#'}>JuasJuas</a>
            </nav>
        </header>
    );
}