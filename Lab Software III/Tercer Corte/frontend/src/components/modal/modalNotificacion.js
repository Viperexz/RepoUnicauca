import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../css/components/modal/modalEliminar.css';
import { CiWarning } from "react-icons/ci";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function ModalNotificaciones({ isOpen, onClose, onConfirm, Title, message, mode }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300); // Duration of the slide-down animation
    };

    if (!isOpen && !isClosing) return null;

    const getIcon = () => {
        switch (mode) {
            case 'error':
                return <MdOutlineReportGmailerrorred className={'logoAlerta'} style={{ color: 'var(--optinal-color3)' }} />;
            case 'success':
                return <FaCheck className={'logoAlerta'} style={{ color: 'var(--optinal-color2)' }} />;
            default:
                return <CiWarning className={'logoAlerta'} />;
        }
    };

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isClosing ? 'slide-down' : 'slide-up'}`}>
                {getIcon()}
                <h2 className={'tituloModal'}>{Title}</h2>
                <p className={'mensajeModal'}>{message}</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={handleCancel}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalNotificaciones;