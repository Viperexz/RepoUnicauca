import React, { useState } from "react";
import "../../../css/screens/coordinador/crearAsignatura.css";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import dataService from "../../../services/dataServices";

function CrearAsignatura() {
    const [nombre, setNombre] = useState('');
    const [creditos, setCreditos] = useState('');
    const [semestre, setSemestre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const creditosOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];

    const semestreOptions = [
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const asignaturaData = {
            nombre,
            creditos,
            semestre,
            descripcion
        };
        try {
            const response = await dataService.registroAsignaturas(asignaturaData);
            console.log('Asignatura creada:', response);
        } catch (error) {
            console.error('Error creating asignatura', error);
        }
    };

    const renderOptionSection = (title, isSelect = true, options = [], value, setValue) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? (
                <select value={value} onChange={(e) => setValue(e.target.value)}>
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
            <ButtonComponent title={'Agregar'} className={'btnAgregar'}/>
        </div>
    );

    return (
        <ScreenBasic Title={'Gestion de asignaturas'}>
            <h2> Crear asignatura </h2>
            <div className={'crearAsignatura'}>
                <form onSubmit={handleSubmit}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre asignatura:', false, [], nombre, setNombre)}
                        {renderOptionSection('Creditos de la asignatura:', true, creditosOptions, creditos, setCreditos)}
                        {renderOptionSection('Semestre', true, semestreOptions, semestre, setSemestre)}
                    </div>
                    <h3>Descripcion:</h3>
                    <textarea className={'txtDescripcion'} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    <div className={'innerSection'}>
                        {renderInnerSection('Competencia')}
                        {renderInnerSection('Resultados')}
                    </div>
                    <div className={'innerSection'}>
                        <ButtonComponent title={'Crear asignatura'} className={'btnCrear'} type="submit"/>
                    </div>
                </form>
            </div>

        </ScreenBasic>
    );
}

export default CrearAsignatura;