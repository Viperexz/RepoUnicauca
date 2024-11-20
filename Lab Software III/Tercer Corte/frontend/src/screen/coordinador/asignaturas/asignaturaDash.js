import "../../../css/screens/coordinador/asignaturaDash.css";
import Menu from '../../../components/menu';
import React from "react";
import ContainerComponent from "../../../components/containerComponent";
import ButtonComponent from "../../../components/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/tabla";
import { useNavigate } from "react-router-dom";

function AsignaturaDash() {
    const navigate = useNavigate();
    const rol = 1; // Define el rol aquí

    const handleViewCreate = () => {
        navigate('/coordinador/asignaturas/crear');
    };
    const handleViewEdit = () => {
        navigate('/coordinador/asignaturas/editar');
    };

    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol} />
            <ContainerComponent Title={'Gestion de asignaturas'}>
                <div className={'asignaturaContainer'}>
                    <div className={'optionHeader'}>
                        <h3>Se listaran las asignaturas</h3>
                        <ButtonComponent title={'Crear asignatura'} icon={<FiPlusCircle />} onClick={handleViewCreate} className="customButton" />
                    </div>
                    <div className={'asignTable'}>
                        <Tabla onClickEdit={handleViewEdit} />
                    </div>
                </div>
            </ContainerComponent>
        </div>
    );
}

export default AsignaturaDash;