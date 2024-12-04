import "../../../css/screens/coordinador/asignaturaDash.css";
import React from "react";
import ButtonComponent from "../../../components/general/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/general/tabla";
import { useNavigate } from "react-router-dom";
import ScreenBasic from "../../../components/general/ScreenBasic";

function AsignaturaDash() {
    const navigate = useNavigate();
    
    const headers = ["ID","Nombre", "Descripcion", "Creditos", "Semestres", "Competencia" , "Estado", "RAP"];
    const data = [

    ];


    const handleViewCreate = () => {
        navigate('/coordinador/asignaturas/crear');
    };
    const handleViewEdit = (rowData) => {
        navigate('/coordinador/asignaturas/editar', { state: { rowData } });

    };

    const handleViewDelete = (rowData) => {
        console.log("Eliminar", rowData);
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
                    <Tabla headers={headers} data={data} onClickEdit={handleViewEdit} onClickDelete={handleViewDelete} />
                </div>
            </div>
        </ScreenBasic>

)
    ;
}

export default AsignaturaDash;