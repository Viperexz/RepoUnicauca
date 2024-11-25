import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";

function EditarRAPComp() {
    
    const location = useLocation();
    const { rowData } = location.state;
    const [formData, setFormData] = useState(rowData || {});

    const options = [
        { value: 'low', label: 'Baja' },
        { value: 'mid', label: 'Media' },
        { value: 'high', label: 'Alta' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                <InputField name={name} value={value} onChange={handleInputChange} inputClassName={'inputRap'} />
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
            <h2> Crear competencia </h2>
            <form className={'formContainer'} onSubmit={handleSubmit}>
                <div className={'crearAsignatura'}>

                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre:', 'Nombre:', formData.Nombre, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Descripcion:', 'Descripcion:', formData.Descripcion, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nivel de competencia:', 'Nivel de competencia:', formData.Nivel, true, options)}
                    </div>
                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Crear Competencia'} className={'btnCrear'} type={'submit'}/>
                </div>
            </form>
        </ScreenBasic>
);
}

export default EditarRAPComp;