import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { CiMedal, CiTrophy } from "react-icons/ci";
import ScreenBasic from "../../../components/general/ScreenBasic";
import ButtonComponent from "../../../components/general/buttonComponent";
import Tabla from "../../../components/general/tabla";
import "../../../css/screens/coordinador/asignaturaDash.css";
import "../../../css/screens/coordinador/rapDash.css";
import dataServices from "../../../services/dataServices";

function RapDash() {
    const navigate = useNavigate();
    const [activeTable, setActiveTable] = useState('competencias');
    const [competenciaData, setcompetenciaData] = useState([]);
    const [rapData, setRapData] = useState([]);

    const competenciaHeaders = ["ID","Descripcion","Nivel"];
    const rapHeaders = ["ID", "Competencias","Descripcion"];



    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await dataServices.consultaCompetencias();
                console.log(result1);
                setcompetenciaData(result1);
            } catch (error) {
                console.error('Error fetching docentes', error);
            }
            try {
                const result2 = await dataServices.consultaRAP();
                console.log( result2);
                setRapData(result2);
            } catch (error) {
                console.error('Error fetching docentes', error);
            }
        };
        fetchData();
    }, []);


    const handleViewCreate = () => {
        navigate('/coordinador/RAP/crear');
    };

    const handleViewEdit = (rowData) => {
        navigate('/coordinador/RAP/editar', { state: { rowData } });
    };


    return (
        <ScreenBasic  Title={'Gestion de competencias y RA por Asignatura'}>
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
                        <ButtonComponent title={'Agregar resultado '} icon={<FiPlusCircle/>}
                                         onClick={handleViewCreate}
                                         className="customButton"/>
                    </div>
                    <div className={'asignTable'}>
                        <Tabla headers={competenciaHeaders} data={competenciaData} onClickEdit={handleViewEdit}/>
                    </div>
                </div>

            ) : (
                <div className={'asignaturaContainer'}>
                    <div className={'optionHeader'}>
                        <h3>Se listaran las asignaturas</h3>
                        <ButtonComponent title={'Agregar resultado '} icon={<FiPlusCircle/>}
                                         onClick={handleViewCreate}
                                         className="customButton"/>
                    </div>
                    <div className={'asignTable'}>
                        <Tabla headers={rapHeaders} data={rapData} onClickEdit={handleViewEdit}/>
                    </div>
                </div>
            )}
        </ScreenBasic>
    );
}

export default RapDash;
