import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CoordinadorDash from './screen/coordinador/coordinadorDash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoordinadorDash/>
  </React.StrictMode>
);

reportWebVitals();
