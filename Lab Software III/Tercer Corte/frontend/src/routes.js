import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CoordinadorDash from './screen/coordinador/coordinadorDash';
import AsignaturaDash from './screen/coordinador/asignaturas/asignaturaDash';
import App from "./App";
import LoadingScreen from './components/general/LoadingScreen';
import CrearAsignatura from "./screen/coordinador/asignaturas/crearAsignatura";
import EditarAsignatura from "./screen/coordinador/asignaturas/editarAsignatura";
import DocenteDash from "./screen/coordinador/docente/docenteDash";
import CrearDocente from "./screen/coordinador/docente/crearDocente";
import EditarDocente from "./screen/coordinador/docente/editarDocente";
import RaaDash from "./screen/coordinador/RAA/raaDash";
import RapDash from "./screen/coordinador/RAP/rapDash";
import CrearRAPComp from "./screen/coordinador/RAP/crearRAPComp";
import EditarRAPComp from "./screen/coordinador/RAP/editarRAPComp";
import DocenteDashMain from "./screen/docente/docenteDashMain";
import RubricaDash from "./screen/docente/rubricas/rubricaDash";



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
                        {/* Rutas RAA/> */}
                        <Route path="/coordinador/RAA" element={<RaaDash/>} />
                        {/* Rutas RAP/> */}
                        <Route path="/coordinador/RAP" element={<RapDash/>} />
                        <Route path="/coordinador/RAP/crear" element={<CrearRAPComp/>} />
                        <Route path="/coordinador/RAP/editar" element={<EditarRAPComp/>} />



                        {/* Docente/> */}
                        <Route path={"/docente"} element={<DocenteDashMain/>} />
                        {/* Rubricas */}

                        <Route path={"/docente/rubricas"} element={<RubricaDash/>} />

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