import React, { useState } from "react";
import "../../../css/screens/coordinador/crearAsignatura.css";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import TableModal from "../../../components/modal/modalTabla";
import dataService from "../../../services/dataServices";
import ModalConfirmar from "../../../components/modal/modalNotificacion";
import ModalNotificaciones from "../../../components/modal/modalNotificacion";

function CrearDocente() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [nombre, setNombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [tipoId, settipoId] = useState('CEDULA');
    const [numId, setnumId] = useState('');
    const [tipoContrato, settipoContrato] = useState('CATEDRA');
    const [tituloAcademico, setTituloAcademico] = useState('');
    const [correo, setCorreo] = useState('');

    /*Modal*/
    const[titleModal, setTitleModal] = useState('');
    const[contentModal, setContentModal] = useState('');
    const [statusModal, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docenteData = {
            tipoIdentificacion: tipoId,
            identificacion: numId,
            nombres: nombre,
            apellidos: apellido,
            email: correo,
            tituloAcademico: tituloAcademico,
            estado: "ACTIVO",
            contrasenia: numId,
            tipoDocente: tipoContrato,
            asignaturas: []
        };
        console.log('competenciaData:', docenteData);
        try {
            const response = await dataService.registroDocentes(docenteData);
            console.log('competencia creada:', response);
            setTitleModal('Confirmación');
            setContentModal('Docente creado exitosamente');
            setStatus('success');
            setIsConfirmModalOpen(true);
        } catch (error) {
            setTitleModal('Error');
            setContentModal('Error creando docente, verifique los campos');
            setStatus('error');
            setIsConfirmModalOpen(true);
            console.error('Error creating competencia', error);
        }
    };

    const tid = [
        { value: 'CEDULA', label: 'Cedula' },
        { value: 'EXTRANJERIA', label: 'Cedula Extranjera' },
        { value: 'TARJETA_IDENTIDAD', label: 'Tarjeta de identidad' },
    ];

    const contrato = [
        { value: 'CATEDRA', label: 'Catedratico' },
        { value: 'TIEMPO_COMPLETO', label: 'Tiempo completo' },
        { value: 'PLANTA', label: 'Planta' },
    ];

    const data = React.useMemo(
        () => [
            { id: 1, nombre: 'Ingenieria de Software III', creditos: 4, semestre: 7 },
            { id: 2, nombre: 'Inteligencia Artificial', creditos: 4, semestre: 7 },
            { id: 3, nombre: 'Bases de datos', creditos: 4, semestre: 7 },
            { id: 4, nombre: 'Redes de Computadoras', creditos: 4, semestre: 6 },
            { id: 5, nombre: 'Sistemas Operativos', creditos: 4, semestre: 5 },
            { id: 6, nombre: 'Algoritmos y Estructuras de Datos', creditos: 4, semestre: 4 },
            { id: 7, nombre: 'Matemáticas Discretas', creditos: 4, semestre: 3 },
            { id: 8, nombre: 'Cálculo I', creditos: 4, semestre: 1 },
            { id: 9, nombre: 'Cálculo II', creditos: 4, semestre: 2 },
            { id: 10, nombre: 'Física I', creditos: 4, semestre: 1 },
            { id: 11, nombre: 'Física II', creditos: 4, semestre: 2 },
            { id: 12, nombre: 'Química', creditos: 4, semestre: 1 },
            { id: 13, nombre: 'Programación I', creditos: 4, semestre: 1 },
            { id: 14, nombre: 'Programación II', creditos: 4, semestre: 2 },
            { id: 15, nombre: 'Ingeniería de Requisitos', creditos: 4, semestre: 6 },
            { id: 16, nombre: 'Arquitectura de Software', creditos: 4, semestre: 7 },
            { id: 17, nombre: 'Desarrollo Web', creditos: 4, semestre: 5 },
            { id: 18, nombre: 'Desarrollo Móvil', creditos: 4, semestre: 6 },
            { id: 19, nombre: 'Seguridad Informática', creditos: 4, semestre: 8 },
            { id: 20, nombre: 'Gestión de Proyectos', creditos: 4, semestre: 8 },
            { id: 21, nombre: 'Inteligencia de Negocios', creditos: 4, semestre: 7 },
            { id: 22, nombre: 'Minería de Datos', creditos: 4, semestre: 7 },
            { id: 23, nombre: 'Aprendizaje Automático', creditos: 4, semestre: 8 },
            { id: 24, nombre: 'Robótica', creditos: 4, semestre: 8 },
            { id: 25, nombre: 'Visión por Computadora', creditos: 4, semestre: 8 },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Nombre', accessor: 'nombre' },
            { Header: 'Creditos', accessor: 'creditos' },
            { Header: 'Semestre', accessor: 'semestre' },
        ],
        []
    );

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleRowSelect = (row) => {
        if (Array.isArray(row)) {
            console.log('Seleccionadas: ', row.length);
            setSelectedRows(row.length);
        } else {
            console.error("La estructura de 'row' no es válida o no es un array.");
        }
    };

    const renderOptionSection = (title, isSelect = true, value, setValue, options = []) => (
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
                <InputField placeholder={title} value={value} onChange={(e) => setValue(e.target.value)}/>
            )}
        </div>
    );

    const handleAssignSubject = () => {
        setIsModalOpen(true);
    };

    const renderInnerSection = (title, selectedCount) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{`${title} (${selectedCount})`}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} onClick={handleAssignSubject} />
        </div>
    );

    return (
        <ScreenBasic Title={'Gestion de docentes'}>
            <h2> Crear docente </h2>
            <div className={'crearAsignatura'}>
                <form className={'formContainer'} onSubmit={handleSubmit}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre:', false, nombre, setNombre)}
                        {renderOptionSection('Apellidos:', false, apellido, setapellido)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo de identificacion:', true, tipoId, settipoId, tid)}
                        {renderOptionSection('Identificacion:', false, numId, setnumId)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo de contrato:', true, tipoContrato, settipoContrato, contrato)}
                        {renderOptionSection('Correo electronico:', false, correo, setCorreo)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Titulo academico:', false, tituloAcademico, setTituloAcademico)}
                    </div>
                    <div className={'innerSection'}>
                        {renderInnerSection('Asignar asignatura. Seleccionadas:', selectedRows)}
                    </div>
                    <div className={'innerSection'}>
                        <ButtonComponent title={'Crear docente'} className={'btnCrear'} type="submit"/>
                    </div>
                </form>
            </div>
            <TableModal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                data={data}
                columns={columns}
                onRowSelect={handleRowSelect}
            />
            <ModalNotificaciones
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                Title={titleModal}
                message={contentModal}
                mode={statusModal}
            />
        </ScreenBasic>
    );
}

export default CrearDocente;