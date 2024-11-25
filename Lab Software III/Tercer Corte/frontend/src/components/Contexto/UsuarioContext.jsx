// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        numIdUsuario: '',
        nombreUsuario: '',
        apellidoUsuario:'',
        corroUsuario:'',
        rol: 0
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};