import "../../../css/screens/coordinador/asignaturaDash.css";
import React from "react";
import ButtonComponent from "../../../components/general/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/general/tabla";
import { useNavigate } from "react-router-dom";
import ScreenBasic from "../../../components/general/ScreenBasic";

function RubricaDash() {
    const navigate = useNavigate();
    
    const headers = ["ID","Nombre", "Estado" , "Asignatura"];
    const data = [
        {
            ID: 1,
            Nombre:"Presentacion del documento",
            Estado:"Activo",
            Asignatura: "Metodologia de investigacion"
        },
        {
            ID: 2,
            Nombre:"Introduccion",
            Estado:"Activo",
            Asignatura: "Metodologia de investigacion"
        },
        {
            ID: 3,
            Nombre:"Metodologia",
            Estado:"Activo",
            Asignatura: "Metodologia de investigacion"
        },
        {
            ID: 4,
            Nombre:"Resultados",
            Estado:"Activo",
            Asignatura: "Metodologia de investigacion"
        }
    ];


    const handleViewCreate = () => {
        navigate('/coordinador/asignaturas/crear');
    };
    const handleViewEdit = (rowData) => {
        navigate('/coordinador/asignaturas/editar', { state: { rowData } });

    };


    return (
        <ScreenBasic   Title={'Gestion de asignaturas'} >
            <div className={'asignaturaContainer'}>
                <div className={'optionHeader'}>
                    <h3>Se listaran las asignaturas</h3>
                    <ButtonComponent title={'Crear asignatura'} icon={<FiPlusCircle/>} onClick={handleViewCreate}
                                     className="customButton"/>
                </div>
                <div className={'asignTable'}>
                    <Tabla headers={headers} data={data} onClickEdit={handleViewEdit} />
                </div>
            </div>
        </ScreenBasic>

)
    ;
}

export default RubricaDash;