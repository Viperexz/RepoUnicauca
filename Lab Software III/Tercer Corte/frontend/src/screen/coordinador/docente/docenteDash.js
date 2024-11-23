import "../../../css/screens/coordinador/asignaturaDash.css";
import "../../../css/screens/coordinador/docenteDash.css";

import React, { useState } from "react";
import ButtonComponent from "../../../components/general/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/general/tabla";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/general/inputField";
import { RxMagnifyingGlass } from "react-icons/rx";
import ScreenBasic from "../../../components/general/ScreenBasic";

function DocenteDash() {
    const navigate = useNavigate();
    const rol = 1; // Define el rol aquí

    const [searchField, setSearchField] = useState("Nombre");
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewCreate = () => {
        navigate('/coordinador/docentes/crear');
    };
    const handleViewEdit = (rowData) => {
        navigate('/coordinador/docentes/editar', { state: { rowData } });
    };

    const headers = ["Nombre", "Apellidos", "Tipo identificacion", "Identificacion", "Tipo docente", "Correo electronico", "Asignaturas"];
    const data = [
        {
            Nombre: "Juan",
            Apellidos: "Pérez",
            "Tipo identificacion": "Cédula",
            Identificacion: "123456789",
            "Tipo docente": "Titular",
            "Correo electronico": "juan.perez@example.com",
            Asignaturas: "Matemáticas"
        },
        {
            Nombre: "María",
            Apellidos: "Gómez",
            "Tipo identificacion": "Pasaporte",
            Identificacion: "987654321",
            "Tipo docente": "Adjunto",
            "Correo electronico": "maria.gomez@example.com",
            Asignaturas: "Física"
        },
        {
            Nombre: "Carlos",
            Apellidos: "Rodríguez",
            "Tipo identificacion": "Cédula",
            Identificacion: "456789123",
            "Tipo docente": "Titular",
            "Correo electronico": "carlos.rodriguez@example.com",
            Asignaturas: "Química"
        },
        {
            Nombre: "Ana",
            Apellidos: "Martínez",
            "Tipo identificacion": "Pasaporte",
            Identificacion: "321654987",
            "Tipo docente": "Adjunto",
            "Correo electronico": "ana.martinez@example.com",
            Asignaturas: "Biología"
        }
    ];

    const filteredData = data.filter(item => {
        const value = item[searchField];
        return value && value.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <ScreenBasic rol={rol} Title={'Gestion de docentes'}>
            <div className={'asignaturaContainer'}>
                <div className={'optionHeader'}>
                    <h3>Se listaran los docentes registrados</h3>
                    <ButtonComponent title={'Crear docente'} icon={<FiPlusCircle />} onClick={handleViewCreate} className="customButton" />
                </div>
                <div className={'optionHeaderBuscar'}>
                    <h3 className={'labelSelect'}>Buscar por:</h3>
                    <select className={'selectOption'} value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        {headers.map(header => (
                            <option key={header} value={header}>{header}</option>
                        ))}
                    </select>
                    <InputField placeholder={'Buscar'} icon={<RxMagnifyingGlass />} inputClassName={'buscarField'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className={'asignTable'}>
                    <Tabla headers={headers} data={filteredData} onClickEdit={handleViewEdit} />
                </div>
            </div>
        </ScreenBasic>
    );
}

export default DocenteDash;