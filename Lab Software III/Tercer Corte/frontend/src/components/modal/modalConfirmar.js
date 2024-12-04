import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../css/components/modal/modalEliminar.css';
import { CiWarning } from "react-icons/ci";

function ModalEliminar({ isOpen, onClose, onConfirm, Title ,message }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300); // Duration of the slide-down animation
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isClosing ? 'slide-down' : 'slide-up'}`}>
                <CiWarning className={'logoAlerta'}/>
                <h2 className={'tituloModal'}>{Title}</h2>
                <p className={'mensajeModal'}>{message}</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={handleCancel}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

ModalEliminar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    message: PropTypes.string
};

ModalEliminar.defaultProps = {
    message: '¿Estás seguro de que deseas eliminar este elemento?'
};

export default ModalEliminar;