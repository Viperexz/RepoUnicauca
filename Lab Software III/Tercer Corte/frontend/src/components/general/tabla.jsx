import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/components/general/tabla.css';
import ModalEliminar from "../modal/modalEliminar";

function Tabla({ headers, data, onClickEdit, onClickDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onClickDelete(selectedRow);
    setModalOpen(false);
  };

  return (
    <>
      <table className="generalTable">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
              <td>
                <FaEdit className="edit-icon" onClick={() => onClickEdit(row)} />
                <FaTrash className="delete-icon" onClick={() => handleDeleteClick(rowIndex)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalEliminar
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="¿Estás seguro de que deseas eliminar este elemento?"
      />
    </>
  );
}

export default Tabla;