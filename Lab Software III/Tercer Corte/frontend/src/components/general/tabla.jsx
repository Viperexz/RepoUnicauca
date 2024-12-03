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
            {(onClickEdit || onClickDelete) && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
              {(onClickEdit || onClickDelete) && (
                <td>
                  {onClickEdit && <FaEdit className="edit-icon" onClick={() => onClickEdit(row)} />}
                  {onClickDelete && <FaTrash className="delete-icon" onClick={() => handleDeleteClick(rowIndex)} />}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {onClickDelete && (
        <ModalEliminar
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message="¿Estás seguro de que deseas eliminar este elemento?"
        />
      )}
    </>
  );
}

export default Tabla;