import "../../../css/screens/coordinador/crearAsignatura.css";
import "../../../css/screens/coordinador/crearRapCom.css";
import React, { useEffect, useState } from "react";
import InputField from "../../../components/general/inputField";
import ButtonComponent from "../../../components/general/buttonComponent";
import ScreenBasic from "../../../components/general/ScreenBasic";
import dataService from "../../../services/dataServices";
import TableModal from "../../../components/modal/modalTabla";
import dataServices from "../../../services/dataServices";

function CrearRAP() {
    const [descripcion, setDescripcion] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await dataServices.consultaCompetencias();
                setData(result1);
            } catch (error) {
                console.error('Error fetching competencias', error);
            }
        };
        fetchData();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'ID' },
            { Header: 'Descripcion', accessor: 'Descripcion' },
            { Header: 'Nivel', accessor: 'Nivel' },
        ],
        []
    );

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleRowSelect = (rows) => {
        setSelectedRows(rows);
    };

    const handleAssignSubject = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const competenciaData = {
            descripcion,
            nivel: selectedRows.map(row => row.Nivel).join(', ')
        };
        console.log('competenciaData:', competenciaData);
        try {
            const response = await dataService.registroCompetencias(competenciaData);
            console.log('competencia creada:', response);
        } catch (error) {
            console.error('Error creating competencia', error);
        }
    };

    const renderOptionSection = (title, isSelect = true, options = [], value, setValue) => (
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
                <InputField placeholder={title} value={value} onChange={(e) => setValue(e.target.value)} />
            )}
        </div>
    );

    const renderInnerSection = (title, selectedCount) => (
        <div className={'innerSection'}>
            <h3 className={'ButtonTitle'}>{`${title} (${selectedCount})`}</h3>
            <ButtonComponent title={'Agregar'} className={'btnAgregar'} onClick={handleAssignSubject} />
        </div>
    );

    return (
        <ScreenBasic Title={'Gestion de competencias y RA por Asignatura'}>
            <h2> Crear Resultado de Aprendizaje </h2>
            <form className={'formulario'} onSubmit={handleSubmit}>
                <div className={'crearAsignatura'}>
                    <div className={'innerSection'}>
                        {renderOptionSection('Descripcion:', false, [], descripcion, setDescripcion)}
                    </div>
                    <div className={'innerSection'}>
                        {renderInnerSection('Asignar asignatura. Seleccionadas:', selectedRows.length)}
                    </div>
                </div>
                <div className={'innerSection'}>
                    <ButtonComponent title={'Crear Competencia'} className={'btnCrear'} type="submit" />
                </div>
            </form>
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

export default CrearRAP;