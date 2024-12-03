import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";
import dataService from "../../../services/dataServices";

function EditarRAPComp() {

    const location = useLocation();
    const { rowData } = location.state;
    const [formData, setFormData] = useState(rowData || {});

    const options = [
        { value: 'BASICO', label: 'Basico' },
        { value: 'INTERMEDIO', label: 'Intermedio' },
        { value: 'AVANZADO', label: 'Avanzado' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!formData.nombre || !formData.descripcion || !formData.nivel) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const competenciaData = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            nivel: formData.nivel
        };

        try {
            const response = await dataService.registroCompetencias(competenciaData);
            console.log('Competencia creada:', response);
            alert('Competencia actualizada correctamente.');
        } catch (error) {
            console.error('Error creating competencia', error);
            alert('Error al actualizar la competencia.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const renderOptionSection = (title, name, value, isSelect = true, options = []) => (
        <div className={'optionSection'}>
            <h3>{title}</h3>
            {isSelect ? (
                <select name={name} value={value} onChange={handleInputChange} className={'selectOption'}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <InputField
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    inputClassName={'inputRap'}
                    placeholder={value}
                />
            )}
        </div>
    );

    const renderInnerSection = (title, selectedCount, onClick) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{`${title} (${selectedCount})`}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} onClick={onClick} />
        </div>
    );

    return (
        <ScreenBasic Title={'Gestion de competencias y RA por Asignatura'}>
            <h2> Editar competencia </h2>
            <form className={'formContainer'} onSubmit={handleSubmit}>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre:', 'nombre', formData.nombre, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Descripcion:', 'descripcion', formData.descripcion, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nivel de competencia:', 'nivel', formData.nivel, true, options)}
                    </div>
                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Editar Competencia'} className={'btnCrear'} type={'submit'}/>
                </div>
            </form>
        </ScreenBasic>
    );
}

export default EditarRAPComp;