import "../../../css/screens/coordinador/crearAsignatura.css";
import React, { useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import { useLocation } from "react-router-dom";
import TableModal from "../../../components/modal/modalTabla";

function EditarRubrica() {

    const creditos = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];

    const semestre = [
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
    const location = useLocation();
    const { rowData } = location.state;
    const [formData, setFormData] = useState(rowData);
    const [isCompetenciaModalOpen, setIsCompetenciaModalOpen] = useState(false);
    const [isResultadosModalOpen, setIsResultadosModalOpen] = useState(false);
    const [selectedCompetenciaRows, setSelectedCompetenciaRows] = useState([]);
    const [selectedResultadosRows, setSelectedResultadoRows] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAssignCompetencia = () => {
        setIsCompetenciaModalOpen(true);
    };

    const handleAssignResultados = () => {
        setIsResultadosModalOpen(true);
    };

    const handleModalClose = () => {
        setIsCompetenciaModalOpen(false);
        setIsResultadosModalOpen(false);
    };

    const handleCompetenciaRowSelect = (row) => {
            if (Array.isArray(row)) {
                console.log('Seleccionadas: ', row.length);
                setSelectedCompetenciaRows(row.length);
            } else {
                console.error("La estructura de 'row' no es válida o no es un array.");
            }
    };

    const handleResultadosRowSelect = (row) => {
        if (Array.isArray(row)) {
            console.log('Seleccionadas: ', row.length);
            setSelectedResultadoRows(row.length);
        } else {
            console.error("La estructura de 'row' no es válida o no es un array.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    {/* Sección de datos de prueba */}
    {/* #TODO: Se debe impelmentar la logia para que dependiendo de la competencia se escoja el resultado de aprendizaje*/}
    const dataCompetencia = React.useMemo(
        () => [
            { id: 1, descripcion: 'Capacidad de análisis crítico', nivel: 'Avanzado' },
            { id: 2, descripcion: 'Habilidad en resolución de problemas', nivel: 'Avanzado' },
            { id: 3, descripcion: 'Comunicación efectiva', nivel: 'Basico' },
        ],
        []
    );

    const dataResultados = React.useMemo(
        () => [
            { id: 1, competencias:'Capacidad de análisis crítico',descripcion: 'Analizar y evaluar información de manera crítica' },
            { id: 2, competencias:'Habilidad en resolución de problemas',descripcion: 'Analizar y evaluar información de manera crítica' },
            { id: 3, competencias:'Comunicación efectiva',descripcion: 'Comunicar ideas de manera clara y concisa' },
        ],
        []
    );

    const columnsCompetencia = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Descripcion', accessor: 'descripcion' },
            { Header: 'Nivel', accessor: 'nivel' },
        ],
        []
    );


    const columnsRA = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Competencias', accessor: 'competencias' },
            { Header: 'Descripcion', accessor: 'descripcion' },

        ],
        []
    );

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

    const renderInnerSection = (title, selectedCount, onClick) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{`${title} (${selectedCount})`}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} onClick={onClick} />
        </div>
    );

    return (
        <ScreenBasic  Title={'Gestion de asignaturas'}>
            <h2> Editar asignatura </h2>
            <div className={'crearAsignatura'}>
                <form className={'formContainer'} onSubmit={handleSubmit}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Nombre asignatura:', 'Nombre', formData.Nombre, false)}
                        {renderOptionSection('Creditos de la asignatura:', 'Creditos', formData.Creditos, true,creditos )}
                        {renderOptionSection('Semestre', 'Semestre', formData.Semestre, true,semestre)}
                    </div>
                    <h3>Descripcion:</h3>
                    <textarea
                        className={'txtDescripcion'}
                        name="Descripcion"
                        value={formData.Descripcion}
                        onChange={handleInputChange}
                    />
                    <div className={'innerSection'}>
                        {renderInnerSection('Competencia', selectedCompetenciaRows, handleAssignCompetencia)}
                        {renderInnerSection('Resultados', selectedResultadosRows, handleAssignResultados)}
                    </div>
                    <div className={'innerSection'}>
                        <ButtonComponent title={'Guardar cambios'} className={'btnCrear'}
                                         onClick={() => console.log(formData)} type="submit"/>
                    </div>
                </form>
            </div>

            <TableModal
                isOpen={isCompetenciaModalOpen}
                onRequestClose={handleModalClose}
                data={dataCompetencia}
                columns={columnsCompetencia}
                onRowSelect={handleCompetenciaRowSelect}
            />
            <TableModal
                isOpen={isResultadosModalOpen}
                onRequestClose={handleModalClose}
                data={dataResultados}
                columns={columnsRA}
                onRowSelect={handleResultadosRowSelect}
            />
        </ScreenBasic>
    );
}

export default EditarRubrica;