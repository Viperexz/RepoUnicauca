import "../../../css/screens/coordinador/crearAsignatura.css";
import React from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";

function CrearAsignatura() {

    const creditos = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];

    const semestre = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];

    const renderOptionSection = (title, isSelect = true, options = []) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? (
                <select>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <InputField placeholder={title} />
            )}
        </div>
    );

    const renderInnerSection = (title) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{title}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'}/>
        </div>
    );

    return (


        <ScreenBasic   Title={'Gestion de asignaturas'} >
                <h2> Crear asignatura </h2>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre asignatura:', false)}
                        {renderOptionSection('Creditos de la asignatura:', true, creditos)}
                        {renderOptionSection('Semestre',true,semestre)}
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
        </ScreenBasic>
    );
}

export default CrearAsignatura;