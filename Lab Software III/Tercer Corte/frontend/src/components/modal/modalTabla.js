import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useTable, useFilters, usePagination } from 'react-table';
import '../../css/components/modal/modalEliminar.css';
import '../../css/components/modal/modalTabla.css';

Modal.setAppElement('#root');

function TableModal({ isOpen, onRequestClose, data, columns, onRowSelect }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
        useFilters,
        usePagination
    );

    const handleRowSelect = (row) => {
        const { id } = row.original;
        const isSelected = selectedRows.some((r) => r.id === id);
        const updatedRows = isSelected
            ? selectedRows.filter((r) => r.id !== id)
            : [...selectedRows, row.original];

        setSelectedRows(updatedRows);
        onRowSelect(updatedRows);
    };

    const handleCancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onRequestClose();
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isClosing ? 'slide-down' : 'slide-up'}`}>
                <h2 className="tituloModal">Selecciona un elemento</h2>
                <input
                    type="text"
                    placeholder="Filtrar:"
                    onChange={(e) => setFilter('nombre', e.target.value)}
                />
                <div className="seccionTabla">
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                    <th>Seleccionar</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.some((r) => r.id === row.original.id)}
                                                onChange={() => handleRowSelect(row)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {pageOptions.length > 1 && (
                    <div className="pagination">
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>
                        <span>
                            Página {pageIndex + 1} de {pageOptions.length}
                        </span>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>
                    </div>
                )}
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

TableModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onRowSelect: PropTypes.func,
};

export default TableModal;