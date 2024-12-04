// src/routes.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CoordinadorDash from './screen/coordinador/coordinadorDash';
import AsignaturaDash from './screen/coordinador/asignaturas/asignaturaDash';
import CrearAsignatura from './screen/coordinador/asignaturas/crearAsignatura';
import EditarAsignatura from './screen/coordinador/asignaturas/editarAsignatura';
import DocenteDash from './screen/coordinador/docente/docenteDash';
import CrearDocente from './screen/coordinador/docente/crearDocente';
import EditarDocente from './screen/coordinador/docente/editarDocente';
import RaaDash from './screen/coordinador/RAA/raaDash';
import RapDash from './screen/coordinador/RAP/rapDash';
import CrearRAPComp from './screen/coordinador/RAP/crearRAPComp';
import EditarRAPComp from './screen/coordinador/RAP/editarRAPComp';
import CrearRAP from './screen/coordinador/RAP/crearRAP';
import EditarRAP from './screen/coordinador/RAP/editarRAP';
import DocenteDashMain from './screen/docente/docenteDashMain';
import RubricaDash from './screen/docente/rubricas/rubricaDash';
import PrivateRoute from './services/privateRoute';
import App from "./App";
import LoadingScreen from './components/general/LoadingScreen';

function AppRoutes() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading && <LoadingScreen />}
            <Routes location={location}>
                <Route path="/" element={<App />} />
                <Route path="/coordinador" element={
                    <PrivateRoute roles={[1]}>
                        <CoordinadorDash />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/asignaturas" element={
                    <PrivateRoute roles={[1]}>
                        <AsignaturaDash />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/asignaturas/crear" element={
                    <PrivateRoute roles={[1]}>
                        <CrearAsignatura />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/asignaturas/editar" element={
                    <PrivateRoute roles={[1]}>
                        <EditarAsignatura />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/docentes" element={
                    <PrivateRoute roles={[1]}>
                        <DocenteDash />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/docentes/crear" element={
                    <PrivateRoute roles={[1]}>
                        <CrearDocente />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/docentes/editar" element={
                    <PrivateRoute roles={[1]}>
                        <EditarDocente />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/RAA" element={
                    <PrivateRoute roles={[1]}>
                        <RaaDash />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/RAP" element={
                    <PrivateRoute roles={[1]}>
                        <RapDash />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/Compe/crear" element={
                    <PrivateRoute roles={[1]}>
                        <CrearRAPComp />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/Compe/editar" element={
                    <PrivateRoute roles={[1]}>
                        <EditarRAPComp />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/RAP/crear" element={
                    <PrivateRoute roles={[1]}>
                        <CrearRAP />
                    </PrivateRoute>
                } />
                <Route path="/coordinador/RAP/editar" element={
                    <PrivateRoute roles={[1]}>
                        <EditarRAP />
                    </PrivateRoute>
                } />
                <Route path="/docente" element={
                    <PrivateRoute roles={[0]}>
                        <DocenteDashMain />
                    </PrivateRoute>
                } />
                <Route path="/docente/rubricas" element={
                    <PrivateRoute roles={[0]}>
                        <RubricaDash />
                    </PrivateRoute>
                } />
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