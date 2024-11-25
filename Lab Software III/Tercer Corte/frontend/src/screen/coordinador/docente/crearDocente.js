import "../../../css/screens/coordinador/crearAsignatura.css";
import React from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";

function CrearDocente() {

    const tid = [
        { value: 'cc', label: 'Cedula' },
        { value: 'ce', label: 'Cedula Extrangera' },
        { value: 'ps', label: 'Pasaporte' },
    ];

    const contrato = [
        { value: 'ca', label: 'Catedratico' },
        { value: 'oc', label: 'Ocacional' },
        { value: 'pla', label: 'Planta' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };




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
        <ScreenBasic  Title={'Gestion de docentes'}>
            <form>
                <h2> Crear asignatura </h2>
                <div className={'crearAsignatura'}>
                    <form className={'formContainer'} onSubmit={handleSubmit}>
                        <div className={'innerSection'}>
                            {renderOptionSection('Nombre:', false)}
                            {renderOptionSection('Apellidos:', false)}
                        </div>
                        <div className={'innerSection'}>
                            {renderOptionSection('Tipo de identificacion:', true, tid)}
                            {renderOptionSection('Identificacion:', false)}
                        </div>
                        <div className={'innerSection'}>
                            {renderOptionSection('Tipo de contrato:', true, contrato)}
                            {renderOptionSection('Correo electronico:', false)}

                        </div>
                        <div className={'innerSection'}>
                            {renderInnerSection('Asignaturas', false)}
                        </div>
                    </form>
                </div>
                <div className={'innerSection'}>
                <ButtonComponent title={'Crear asignatura'} className={'btnCrear'}/>
                </div>
            </form>
        </ScreenBasic>
)
    ;
}

export default CrearDocente;