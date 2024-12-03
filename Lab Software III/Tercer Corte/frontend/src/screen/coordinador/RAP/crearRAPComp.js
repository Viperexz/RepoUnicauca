import "../../../css/screens/coordinador/crearAsignatura.css";
import "../../../css/screens/coordinador/crearRapCom.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import dataService from "../../../services/dataServices";

function CrearRAPComp() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nivel, setNivel] = useState('');

    const options = [
        { value: 'BASICO', label: 'Basico' },
        { value: 'INTERMEDIO', label: 'Intermedio' },
        { value: 'AVANZADO', label: 'Avanzado' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const competenciaData = {
            descripcion,
            nivel
        };
        try {
            const response = await dataService.registroCompetencias(competenciaData);
            console.log('Asignatura creada:', response);
        } catch (error) {
            console.error('Error creating asignatura', error);
        }
    };

    const renderOptionSection = (title, isSelect = true, options = [], value, setValue) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? (
                <select className={'selectOption'} value={value} onChange={(e) => setValue(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <InputField placeholder={title} value={value} onChange={(e) => setValue(e.target.value)} />
            )}
        </div>
    );

    const renderInnerSection = (title) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{title}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} />
        </div>
    );

    return (
        <ScreenBasic Title={'Gestion de competencias y RA por Asignatura'}>
            <h2> Crear Competencia </h2>
            <form className={'formulario'} onSubmit={handleSubmit}>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre:', false, [], nombre, setNombre)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Descripcion:', false, [], descripcion, setDescripcion)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nivel de competencia:', true, options, nivel, setNivel)}
                    </div>
                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Crear Competencia'} className={'btnCrear'} type="submit" />
                </div>
            </form>
        </ScreenBasic>
    );
}

export default CrearRAPComp;