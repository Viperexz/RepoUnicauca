// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/Contexto/UsuarioContext';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useContext(UserContext);

    if (!user.token) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(user.rol)) {
        const redirectPath = user.rol === 1 ? '/coordinador' : '/docente';
        return <Navigate to={redirectPath} />;
    }

    return children;
};

export default PrivateRoute;