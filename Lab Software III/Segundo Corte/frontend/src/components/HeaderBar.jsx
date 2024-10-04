// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../assets/css/HeaderBar.css';
export default function HeaderBar() {
    return (
        <header className={'Header'}>
            <img className={'imgHeader'} src={'https://th.bing.com/th/id/R.1ce51bd2089ae523be30918c2d4d1594?rik=IAsWgvkJ%2bB1O6g&riu=http%3a%2f%2fportal.unicauca.edu.co%2fversionP%2fsites%2fdefault%2ffiles%2fimages%2fEscudo_Unicauca1.png&ehk=zTNA9X66Ji8%2b%2fHXadDjZ53WUf2ekOfYLEs37YYNXNik%3d&risl=&pid=ImgRaw&r=0'}
                 alt={'Ironhack logo'} height={'55'} />
            <nav className={'Nav'}>
                <a className={'item-nav'} href={'#'}>Inicio</a>
                <a className={'item-nav'} href={'#'}>Productos</a>
                <a className={'item-nav'} href={'#'}>No se</a>
            </nav>
        </header>
    );
}