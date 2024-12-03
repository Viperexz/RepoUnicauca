import "../../css/screens/coordinador/coordinadorDash.css";
import "../../css/screens/docente/docenteDashMain.css";
import React from "react";
import {FaHome} from "react-icons/fa";
import Card from "../../components/general/Card";
import ScreenBasic from "../../components/general/ScreenBasic";
import Tabla from "../../components/general/tabla";

function DocenteDashMain() {

    const competenciaHeaders = ["ID","Asignatura","Competencia","Nivel"];
    const competenciaData = [
        {
            ID: 1,
            Asignatura: "Matematicas",
            Competencia: "Capacidad de análisis crítico",
            Nivel: "Avanzado"
        },
        {
            ID: 2,
            Asignatura: "Logica de programación",
            Competencia: "Habilidad en resolución de problemas",
            Nivel: "Intermedio"
        },
        {
            ID: 3,
            Asignatura: "Comunicación",
            Competencia: "Comunicación efectiva",
            Nivel: "Básico"
        },
        {
            ID: 4,
            Asignatura: "Ingenieria de software",
            Competencia: "Trabajo en equipo",
            Nivel: "Avanzado"
        }
    ];
    const handleViewEdit = (rowData) => {
        console.log(rowData);
    };


    return (

        <ScreenBasic Title={'Dashboard'}>
            <h4> Bienvenido al sistema gestor de asignaturas</h4>
            <p> Puede navegar por las opciones a su izquierda.</p>
            <p> En la opcion editar podra aasigntar los RA o crear la Rubrica</p>
            <p> A continuacion tiene las materias registradas:</p>
            <div className={'listaCards'}>
                <Tabla headers={competenciaHeaders} data={competenciaData} onClickEdit={handleViewEdit}/>
            </div>
            <Card
                title="Materias sin Rubrica:50"
                icon={<FaHome/>}
                className={"specialCard"}
            />
        </ScreenBasic>
    );
}


export default DocenteDashMain;
