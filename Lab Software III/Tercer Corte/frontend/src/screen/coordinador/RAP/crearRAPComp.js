import "../../../css/screens/coordinador/crearAsignatura.css";
import "../../../css/screens/coordinador/crearRapCom.css";
import React from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";

function CrearRAPComp() {

    const options = [
        { value: 'low', label: 'Baja' },
        { value: 'mid', label: 'Media' },
        { value: 'high', label: 'Alta' },
    ];

    const renderOptionSection = (title, isSelect = true, options = []) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? (
                <select className={'selectOption'}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <InputField placeholder={title} inputClassName={'inputRap'} />
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


        <ScreenBasic   Title={'Gestion de competencias y RA por Asignatura'} >
                <h2> Crear Competencia </h2>
            <div className={'crearAsignatura'}>
                <div className={'innerSection'}>
                    {renderOptionSection('Nombre:', false)}
                </div>
                <div className={'innerSection'}>
                    {renderOptionSection('Descripcion:', false)}
                </div>
                <div className={'innerSection'}>
                    {renderOptionSection('Nivel de competencia:', true,options)}
                </div>
            </div>
            <div className={'innerSection'}>
                <ButtonComponent title={'Crear Competencia'} className={'btnCrear'}/>
                </div>
        </ScreenBasic>
    );
}

export default CrearRAPComp;