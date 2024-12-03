import "../../css/screens/coordinador/coordinadorDash.css";
import React from "react";
import {FaHome} from "react-icons/fa";
import Card from "../../components/general/Card";
import ScreenBasic from "../../components/general/ScreenBasic";

function CoordinadorDash() {
     // Define el rol aquí
    return (

            <ScreenBasic  Title={'Dashboard'}>>
                <h4> Bienvenido al sistema gestor de resultados de aprendizaje.</h4>
                <h4> Navegue por las opciones de su derecha para interactuar con los diferentes modulos.</h4>
                <div className={'listaCards'}>
                    <Card
                        title="Docentes registrados: 50 "
                        icon={<FaHome/>}
                    />

                    <Card
                        title="Asignaturas registradas: 50 "
                        icon={<FaHome/>}
                    />

                    <Card
                        title="Competencias y RA pendientes:50"
                        icon={<FaHome/>}
                        className="specialCard"
                    />
                </div>
            </ScreenBasic>
    );
}


export default CoordinadorDash;
