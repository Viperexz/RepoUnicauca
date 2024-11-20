import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../css/components/tabla.css';

function Tabla({ onClickEdit, onClickDelete }) {
  const rows = Array.from({ length: 6 }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: 5 }, (_, colIndex) => (
        <td key={colIndex}>Row {rowIndex + 1}, Col {colIndex + 1}</td>
      ))}
      <td>
        <FaEdit className="edit-icon" onClick={onClickEdit} />
        <FaTrash className="delete-icon" onClick={onClickDelete} />
      </td>
    </tr>
  ));

  return (
    <table className="generalTable">
      <thead>
        <tr>
          {Array.from({ length: 5 }, (_, colIndex) => (
            <th key={colIndex}>Header {colIndex + 1}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default Tabla;