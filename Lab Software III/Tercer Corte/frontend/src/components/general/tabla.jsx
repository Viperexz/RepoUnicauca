import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/components/general/tabla.css';
import ModalEliminar from "../modal/modalEliminar";

function Tabla({ headers, data, onClickEdit, onClickDelete }) {
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
                  {onClickDelete && <FaTrash className="delete-icon" onClick={() => onClickDelete(row)} />}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tabla;