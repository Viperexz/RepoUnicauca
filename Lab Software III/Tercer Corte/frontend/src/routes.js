import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CoordinadorDash from './screen/coordinador/coordinadorDash';
import AsignaturaDash from './screen/coordinador/asignaturas/asignaturaDash';
import App from "./App";
import LoadingScreen from './components/LoadingScreen';
import CrearAsignatura from "./screen/coordinador/asignaturas/crearAsignatura";
import EditarAsignatura from "./screen/coordinador/asignaturas/editarAsignatura";
import DocenteDash from "./screen/coordinador/docente/docenteDash";
import CrearDocente from "./screen/coordinador/docente/crearDocente";
import EditarDocente from "./screen/coordinador/docente/editarDocente";

function AppRoutes() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300); // Duración de la transición
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading && <LoadingScreen />}
                    <Routes location={location}>
                        <Route path="/" element={<App />} />
                        {/* Rutas coordinador/> */}
                        <Route path="/coordinador" element={<CoordinadorDash />} />
                        {/* Rutas Asignaturas/> */}
                        <Route path="/coordinador/asignaturas" element={<AsignaturaDash />} />
                        <Route path="/coordinador/asignaturas/crear" element={<CrearAsignatura/>} />
                        <Route path="/coordinador/asignaturas/editar" element={<EditarAsignatura/>} />
                        {/* Rutas Gestion Docentes/> */}
                        <Route path="/coordinador/docentes" element={<DocenteDash />} />
                        <Route path="/coordinador/docentes/crear" element={<CrearDocente/>} />
                        <Route path="/coordinador/docentes/editar" element={<EditarDocente/>} />
                    </Routes>
        </>
    );
}

function AppWrapper() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default AppWrapper;