import "../../../css/screens/coordinador/asignaturaDash.css";
import Menu from '../../../components/menu';
import React from "react";
import ContainerComponent from "../../../components/containerComponent";
import ButtonComponent from "../../../components/buttonComponent";
import { FiPlusCircle } from "react-icons/fi";
import Tabla from "../../../components/tabla";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/inputField";
import { RxMagnifyingGlass } from "react-icons/rx";
function DocenteDash() {
    const navigate = useNavigate();
    const rol = 1; // Define el rol aquí

    const handleViewCreate = () => {
        navigate('/coordinador/docentes/crear');
    };
    const handleViewEdit = () => {
        navigate('/coordinador/docentes/editar');
    };

    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol} />
            <ContainerComponent Title={'Gestion de docentes'}>
                <div className={'asignaturaContainer'}>
                    <div className={'optionHeader'}>
                        <h3>Se listaran los docentes registrados</h3>
                        <ButtonComponent title={'Crear docente'} icon={<FiPlusCircle/>} onClick={handleViewCreate} className="customButton"/>
                    </div>
                    <div className={'optionHeader'}>
                        <h3>Buscar por:</h3>
                        <select>
                            <option>Nombre</option>
                            <option>Tipo de docente</option>
                        </select>
                        <InputField placeholder={'Buscar'} icon={<RxMagnifyingGlass/>}/>
                    </div>
                    <div className={'asignTable'}>
                        <Tabla onClickEdit={handleViewEdit}/>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    );
}

export default DocenteDash;