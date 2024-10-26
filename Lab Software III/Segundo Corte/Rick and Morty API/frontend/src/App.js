// src/App.tsx
import React from 'react';
import './App.css';
import HeaderBar from './components/headerBar.tsx';
import SliderPersonajes from './components/sliderPersonajes.tsx';

function App() {
    return (
        <div className="App">
            <HeaderBar />
            <div className="Body">
                <h1>Hello World</h1>
                <p>A continuación se listarán los diferentes personajes de la serie Rick and Morty:</p>
                <SliderPersonajes />
            </div>
        </div>
    );
}

export default App;