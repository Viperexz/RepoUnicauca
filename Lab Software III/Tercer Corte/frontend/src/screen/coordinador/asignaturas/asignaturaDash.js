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
        {
            ID: 1,
            Nombre: "Matemáticas",
            Descripcion: "Curso básico de matemáticas",
            Creditos: 4,
            Semestres: "1, 2",
            Competencia: "Lógica y razonamiento",
            Estado: "Activo",
            RAP: "RAP1"
        },
        {
            ID: 2,
            Nombre: "Física",
            Descripcion: "Curso básico de física",
            Creditos: 3,
            Semestres: "1, 2",
            Competencia: "Comprensión de fenómenos físicos",
            Estado: "Activo",
            RAP: "RAP2"
        },
        {
            ID: 3,
            Nombre: "Química",
            Descripcion: "Curso básico de química",
            Creditos: 4,
            Semestres: "1, 2",
            Competencia: "Comprensión de reacciones químicas",
            Estado: "Inactivo",
            RAP: "RAP3"
        },
        {
            ID: 4,
            Nombre: "Biología",
            Descripcion: "Curso básico de biología",
            Creditos: 3,
            Semestres: "1, 2",
            Competencia: "Comprensión de organismos vivos",
            Estado: "Activo",
            RAP: "RAP4"
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

export default AsignaturaDash;