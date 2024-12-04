import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/screens/coordinador/asignaturaDash.css";
import "../../../css/screens/coordinador/docenteDash.css";
import ButtonComponent from "../../../components/general/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/general/tabla";
import InputField from "../../../components/general/inputField";
import { RxMagnifyingGlass } from "react-icons/rx";
import ScreenBasic from "../../../components/general/ScreenBasic";
import dataServices from "../../../services/dataServices";

function DocenteDash() {
    const navigate = useNavigate();
    const [searchField, setSearchField] = useState("Nombre");
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataServices.consultaDocentes();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error('Error fetching docentes', error);
            }
        };
        fetchData();
    }, []);

    const handleViewCreate = () => {
        navigate('/coordinador/docentes/crear');
    };

    const handleViewEdit = (rowData) => {
        navigate('/coordinador/docentes/editar', { state: { rowData } });
    };
    const handleViewDelete = (rowData) => {
        console.log("Eliminar", rowData);
    };

    const headers = ["Nombre", "Apellidos", "Tipo identificacion", "Identificacion", "Tipo docente", "Correo electronico", "Asignaturas"];

    const filteredData = data.filter(item => {
        const value = item[searchField];
        return value && value.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <ScreenBasic Title={'Gestion de docentes'}>
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
                    <Tabla headers={headers} data={filteredData} onClickEdit={handleViewEdit} onClickDelete={handleViewDelete}/>
                </div>
            </div>
        </ScreenBasic>
    );
}

export default DocenteDash;