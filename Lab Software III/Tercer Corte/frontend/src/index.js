import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import AppRoutes from "./routes";
import {UserProvider} from "./components/Contexto/UsuarioContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
          <AppRoutes />
      </UserProvider>
  </React.StrictMode>
);

reportWebVitals();