import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";

function EditarDocente() {
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
        <ScreenBasic rol={rol} Title={'Gestion de docentes'}>
            <h2> Editar docente </h2>
            <div className={'crearAsignatura'}>
                <div className={'innerSection'}>
                    {renderOptionSection('Nombre Docente:', 'Nombre', formData.Nombre, false)}
                    {renderOptionSection('Apellido Docente:', 'Apellidos', formData.Apellidos, false)}
                </div>
                <div className={'innerSection'}>
                    {renderOptionSection('Tipo identificacion:', 'Tipo identificacion', formData['Tipo identificacion'], true, ['Cédula', 'Pasaporte'])}
                    {renderOptionSection('Identificacion:', 'Identificacion', formData.Identificacion, false)}
                </div>
                <div className={'innerSection'}>
                    {renderOptionSection('Titulo academico:', 'Titulo academico', formData['Titulo academico'], true, ['Licenciado', 'Master', 'Doctor'])}
                </div>
                <div className={'innerSection'}>
                    {renderInnerSection('Asignar asignatura')}
                </div>
            </div>
            <div className={'innerSection'}>
                <ButtonComponent title={'Guardar cambios'} className={'btnCrear'} onClick={() => console.log(formData)} />
            </div>
        </ScreenBasic>
    );
}

export default EditarDocente;