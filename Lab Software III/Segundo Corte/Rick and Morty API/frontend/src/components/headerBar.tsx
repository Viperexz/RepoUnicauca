// @ts-ignore
import React from 'react';
import '../assets/HeaderBar.css';

const HeaderBar: React.FC = () => {
    return (
        <header className={'Header'}>
            <div className={'logo'}>
                <img className={'imgHeader'}
                     src={'https://www.unicauca.edu.co/wp-content/uploads/2023/11/Logo-Unicauca-Azul@3x.png'} alt={'Ironhack logo'} height={'55'}/>
                <h3>API Rick and Morty</h3>
            </div>
        </header>
    );
}

export default HeaderBar;