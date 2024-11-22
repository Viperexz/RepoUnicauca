import Menu from '../../../components/menu';
import "../../../css/screens/coordinador/crearAsignatura.css";
import React from "react";
import ContainerComponent from "../../../components/containerComponent";
import InputField from "../../../components/inputField";
import ButtonComponent from "../../../components/buttonComponent";
import Select from "react-select/base";

function CrearDocente() {
    const rol = 1;

    const renderOptionSection = (title, isSelect = true , options = []) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? <select options={options} /> : <InputField placeholder={title} inputClassName={'input'}  />}
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
            <ContainerComponent Title={'Gestion de asignaturas'}>
                <h2> Crear asignatura </h2>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre asignatura:', false)}
                        {renderOptionSection('Creditos de la asignatura:', true, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
                        {renderOptionSection('Semestre')}
                    </div>
                    <h3>Descripcion:</h3>
                    <textarea className={'txtDescripcion'}/>
                    <div className={'innerSection'}>
                        {renderInnerSection('Competencia')}
                        {renderInnerSection('Resultados')}
                    </div>
                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Crear asignatura'} className={'btnCrear'}/>
                </div>
            </ContainerComponent>
        </div>
    );
}

export default CrearDocente;