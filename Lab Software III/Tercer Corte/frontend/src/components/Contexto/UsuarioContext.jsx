import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Recupera el usuario del localStorage al cargar la aplicación
        const savedUser = localStorage.getItem('user');
        return savedUser
            ? JSON.parse(savedUser)
            : { numIdUsuario: '', nombreUsuario: '', apellidoUsuario: '', corroUsuario: '', token:'' , rol: 0 };
    });

    useEffect(() => {
        // Guarda el usuario en localStorage cada vez que cambie
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
