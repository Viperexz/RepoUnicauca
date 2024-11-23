import "../../../css/screens/coordinador/crearAsignatura.css";
import React from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";

function CrearDocente() {
    const rol = 1;

    const enviarFormulario = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
    }

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
        <ScreenBasic rol={rol} Title={'Gestion de docentes'}>
            <form>
                <h2> Crear asignatura </h2>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre:', false)}
                        {renderOptionSection('Apellidos:', false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo de identificacion:', true)}
                        {renderOptionSection('Identificacion:', false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo de contrato:', true)}
                        {renderOptionSection('Correo electronico:', false)}

                    </div>
                    <div className={'innerSection'}>
                        {renderInnerSection('Asignaturas', false)}
                    </div>
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