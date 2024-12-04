import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";
import TableModal from "../../../components/modal/modalTabla";
import dataService from "../../../services/dataServices";

function EditarDocente() {

    const options = [
        { value: 'low', label: 'Baja' },
        { value: 'mid', label: 'Media' },
        { value: 'high', label: 'Alta' },
    ];
    const location = useLocation();
    const { rowData } = location.state || {};
    const [formData, setFormData] = useState(rowData || {});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAssignSubject = () => {
        setIsModalOpen(true);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        /*const docenteData = {
            tipoIdentificacion: ,
            identificacion:,
            nombres: ,
            apellidos: ,
            email: ,
            tituloAcademico:,
            estado: "ACTIVO",
            contrasenia: ,
            tipoDocente: ,
            asignaturas: []
        };
        console.log('competenciaData:', competenciaData);
        try {
            const response = await dataService.registroCompetencias(competenciaData);
            console.log('competencia creada:', response);
        } catch (error) {
            console.error('Error creating competencia', error);
        }*/
    };

    const renderOptionSection = (title, name, value, isSelect = true, options = []) => (
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
                <InputField name={name} value={value} onChange={handleInputChange} inputClassName={'input'}/>
            )}
        </div>
    );

    const renderInnerSection = (title, selectedCount) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{`${title} (${selectedCount})`}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} onClick={handleAssignSubject} />
        </div>
    );

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

    return (
        <ScreenBasic  Title={'Gestion de docentes'}>
            <h2> Editar docente </h2>
            <div className={'crearAsignatura'}>
                <form className={'formContainer'} onSubmit={handleSubmit}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre Docente:', 'Nombre', formData.Nombre, false)}
                        {renderOptionSection('Apellido Docente:', 'Apellidos', formData.Apellidos, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Tipo identificacion:', 'Tipo identificacion', formData['Tipo identificacion'], true, options)}
                        {renderOptionSection('Identificacion:', 'Identificacion', formData.Identificacion, false)}
                    </div>
                    <div className={'innerSection'}>
                        {renderOptionSection('Titulo academico:', 'Titulo academico', formData['Titulo academico'], true, options)}
                    </div>
                    <div className={'innerSection'}>
                        {renderInnerSection('Asignar asignatura. Seleccionadas:', selectedRows)}
                    </div>

                    <div className={'innerSection'}>
                        <ButtonComponent title={'Guardar cambios'} className={'btnCrear'} type="submit"/>
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
        </ScreenBasic>
    );
}

export default EditarDocente;