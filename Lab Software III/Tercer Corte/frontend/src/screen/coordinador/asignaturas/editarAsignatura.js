import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";

function EditarAsignatura() {
    const rol = 1;
    const location = useLocation();
    const { rowData } = location.state;
    const [formData, setFormData] = useState(rowData);

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
                <select name={name} value={value} onChange={handleInputChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <InputField name={name} value={value} onChange={handleInputChange} inputClassName={'input'} />
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
        <ScreenBasic rol={rol} Title={'Gestion de asignaturas'}>
            <h2> Editar asignatura </h2>
            <div className={'crearAsignatura'}>
                <div className={'innerSection'}>
                    {renderOptionSection('Nombre asignatura:', 'Nombre', formData.Nombre, false)}
                    {renderOptionSection('Creditos de la asignatura:', 'Creditos', formData.Creditos, true, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
                    {renderOptionSection('Semestre', 'Semestre', formData.Semestre, true)}
                </div>
                <h3>Descripcion:</h3>
                <textarea
                    className={'txtDescripcion'}
                    name="Descripcion"
                    value={formData.Descripcion}
                    onChange={handleInputChange}
                />
                <div className={'innerSection'}>
                    {renderInnerSection('Competencia')}
                    {renderInnerSection('Resultados')}
                </div>
            </div>
            <div className={'innerSection'}>
                <ButtonComponent title={'Guardar cambios'} className={'btnCrear'} onClick={() => console.log(formData)} />
            </div>
        </ScreenBasic>
    );
}

export default EditarAsignatura;