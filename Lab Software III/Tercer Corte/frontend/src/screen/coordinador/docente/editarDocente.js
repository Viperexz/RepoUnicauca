import Menu from '../../../components/menu';
import "../../../css/screens/coordinador/crearAsignatura.css";
import React from "react";
import ContainerComponent from "../../../components/containerComponent";
import InputField from "../../../components/inputField";
import ButtonComponent from "../../../components/buttonComponent";
import Select from "react-select/base";

function EditarDocente() {
    const rol = 1;

    const renderOptionSection = (title, isSelect = true , options = []) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? <select options={options} /> : <InputField placeholder={title} inputClassName={'input'} />}
        </div>
    );

    const renderInnerSection = (title) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{title}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'}/>
        </div>
    );

    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol} />
            <ContainerComponent Title={'Gestion de docentes'}>
                <h2> Editar docente </h2>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre Docente:', false)}
                        {renderOptionSection('Apellido Docente:', false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo identificacion:', true)}
                        {renderOptionSection('Identificacion:', false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Titulo academico:', true)}
                    </div>
                    <div className={'innerSection'}>
                        {renderInnerSection('Asginar asignatura')}
                    </div>

                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Editar asignatura'} className={'btnCrear'}/>
                </div>
            </ContainerComponent>
        </div>
    );
}

export default EditarDocente;