import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { CiMedal, CiTrophy } from "react-icons/ci";
import ScreenBasic from "../../../components/general/ScreenBasic";
import ButtonComponent from "../../../components/general/buttonComponent";
import Tabla from "../../../components/general/tabla";
import "../../../css/screens/coordinador/asignaturaDash.css";
import "../../../css/screens/coordinador/rapDash.css";
import dataServices from "../../../services/dataServices";
import ModalEliminar from "../../../components/modal/modalConfirmar";

function RapDash() {
    const navigate = useNavigate();
    const [activeTable, setActiveTable] = useState('competencias');
    const [competenciaData, setcompetenciaData] = useState([]);
    const [rapData, setRapData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteType, setDeleteType] = useState('');

    const competenciaHeaders = ["ID", "Descripcion", "Nivel"];
    const rapHeaders = ["ID", "Competencias", "Descripcion"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await dataServices.consultaCompetencias();
                setcompetenciaData(result1);
            } catch (error) {
                console.error('Error fetching competencias', error);
            }
            try {
                const result2 = await dataServices.consultaRAP();
                setRapData(result2);
            } catch (error) {
                console.error('Error fetching RAP', error);
            }
        };
        fetchData();
    }, []);

    const handleViewCompeCreate = () => {
        navigate('/coordinador/Compe/crear');
    };

    const handleViewRAPCreate = () => {
        navigate('/coordinador/RAP/crear');
    };

    const handleViewCompeEdit = (rowData) => {
        navigate('/coordinador/Compe/editar', { state: { rowData } });
    };

    const handleViewRAPEdit = (rowData) => {
        navigate('/coordinador/RAP/editar', { state: { rowData } });
    };

    const handleViewCompeEliminar = (rowData) => {
        setSelectedRow(rowData);
        setDeleteType('competencia');
        setIsModalOpen(true);
    };

    const handleViewRAPEliminar = (rowData) => {
        setSelectedRow(rowData);
        setDeleteType('rap');
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (deleteType === 'competencia') {
                console.log('Se eliminara: ', selectedRow.ID);
                await dataServices.eliminarCompetencias(selectedRow.ID);
                setcompetenciaData(competenciaData.filter(item => item.ID !== selectedRow.ID));
            } else if (deleteType === 'rap') {
                await dataServices.eliminarRAP(selectedRow.ID);
                setRapData(rapData.filter(item => item.ID !== selectedRow.ID));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <ScreenBasic Title={'Gestion de competencias y RA por Asignatura'}>
            <div className={'buttonListHeader'}>
                <ButtonComponent
                    title={'Competencias'}
                    icon={<CiTrophy />}
                    className={`buttonHeader ${activeTable === 'competencias' ? 'active' : ''}`}
                    onClick={() => setActiveTable('competencias')}
                />
                <ButtonComponent
                    title={'Resultados de aprendizaje'}
                    icon={<CiMedal />}
                    className={`buttonHeader ${activeTable === 'rap' ? 'active' : ''}`}
                    onClick={() => setActiveTable('rap')}
                />
            </div>

            {activeTable === 'competencias' ? (
                <div className={'asignaturaContainer'}>
                    <div className={'optionHeader'}>
                        <h3>Se listaran las asignaturas</h3>
                        <ButtonComponent title={'Agregar resultado '} icon={<FiPlusCircle />}
                                         onClick={handleViewCompeCreate}
                                         className="customButton" />
                    </div>
                    <div className={'asignTable'}>
                        <Tabla headers={competenciaHeaders} data={competenciaData} onClickEdit={handleViewCompeEdit} onClickDelete={handleViewCompeEliminar} />
                    </div>
                </div>
            ) : (
                <div className={'asignaturaContainer'}>
                    <div className={'optionHeader'}>
                        <h3>Se listaran las asignaturas</h3>
                        <ButtonComponent title={'Agregar resultado '} icon={<FiPlusCircle />}
                                         onClick={handleViewRAPCreate}
                                         className="customButton" />
                    </div>
                    <div className={'asignTable'}>
                        <Tabla headers={rapHeaders} data={rapData} onClickEdit={handleViewRAPEdit} onClickDelete={handleViewRAPEliminar} />
                    </div>
                </div>
            )}

            <ModalEliminar
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                Title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar el elemento de ID: ${selectedRow ? selectedRow.ID : ''}?`}
            />
        </ScreenBasic>
    );
}

export default RapDash;