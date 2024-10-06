// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../assets/css/footer.css';
export default function Footer() {
    return (
        <footer className={'Footer'}>
            <img
                src={'https://www.unicauca.edu.co/wp-content/uploads/2023/11/Logo-Unicauca-Azul@3x.png'}
                alt={'Logo unicauca'}
            />
            <div className={'separator'}></div>
            <div className={"textos"}>
                <h6>Universidad del Cauca</h6>
                <p>Facultad de Ingeniería Electrónica y Telecomunicaciones</p>
                <p>Programa ingenierias de sistemas</p>
            </div>

        </footer>
    );
}