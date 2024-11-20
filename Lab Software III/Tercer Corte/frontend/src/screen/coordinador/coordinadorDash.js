import "../../css/screens/coordinador/coordinadorDash.css";
import Menu from '../../components/menu';
import React from "react";
import ContainerComponent from "../../components/containerComponent";
import {FaHome} from "react-icons/fa";
import Card from "../../components/Card";

function CoordinadorDash() {
    const rol = 1; // Define el rol aquí
    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol}/>
            <ContainerComponent Title={'Dashboard'}>
                <h4> Bienvenido al sistema gestor de resultados de aprendizaje.</h4>
                <h4> Navegue por las opciones de su derecha para interactuar con los diferentes modulos.</h4>
                <div className={'listaCards'}>
                    <Card
                        title="Docentes registrados: 50 "
                        icon={<FaHome />}
                    />

                    <Card
                        title="Asignaturas registradas: 50 "
                        icon={<FaHome />}
                    />

                    <Card
                        title="Competencias y RA pendientes:50"
                        icon={<FaHome />}
                    />
                </div>
            </ContainerComponent>
        </div>
    );
}


export default CoordinadorDash;
