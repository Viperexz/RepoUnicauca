import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { CiMedal, CiTrophy } from "react-icons/ci";
import ScreenBasic from "../../../components/general/ScreenBasic";
import ButtonComponent from "../../../components/general/buttonComponent";
import Tabla from "../../../components/general/tabla";
import "../../../css/screens/coordinador/asignaturaDash.css";
import "../../../css/screens/coordinador/rapDash.css";

function RapDash() {
    const navigate = useNavigate();
    const [activeTable, setActiveTable] = useState('competencias');
    const rol = 1;

    const competenciaHeaders = ["ID","Descripcion","Nivel"];
    const rapHeaders = ["ID", "Competencias","Descripcion"];

    const competenciaData = [
        {
            ID: 1,
            Descripcion: "Capacidad de análisis crítico",
            Nivel: "Avanzado"
        },
        {
            ID: 2,
            Descripcion: "Habilidad en resolución de problemas",
            Nivel: "Intermedio"
        },
        {
            ID: 3,
            Descripcion: "Comunicación efectiva",
            Nivel: "Básico"
        },
        {
            ID: 4,
            Descripcion: "Trabajo en equipo",
            Nivel: "Avanzado"
        }
    ];

    const rapData = [
        {
            ID: 1,
            Competencias: "Capacidad de análisis crítico",
            Descripcion: "Analizar y evaluar información de manera crítica"
        },
        {
            ID: 2,
            Competencias: "Habilidad en resolución de problemas",
            Descripcion: "Resolver problemas complejos de manera eficiente"
        },
        {
            ID: 3,
            Competencias: "Comunicación efectiva",
            Descripcion: "Comunicar ideas de manera clara y concisa"
        },
        {
            ID: 4,
            Competencias: "Trabajo en equipo",
            Descripcion: "Colaborar efectivamente con otros en un equipo"
        }
    ];

    const handleViewCreate = () => {
        navigate('/coordinador/asignaturas/crear');
    };
    const handleViewEdit = () => {
        navigate('/coordinador/asignaturas/editar');
    };

    return (
        <ScreenBasic rol={rol} Title={'Gestion de competencias y RA por Asignatura'}>
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
