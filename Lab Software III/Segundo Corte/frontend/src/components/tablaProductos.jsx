import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import '../assets/css/tablaProductos.css';
import { editarModal as EditModal } from './modal/editarModal';
import { eliminarModal as DeleteModal } from './modal/eliminarModal';

const TablaProductos = forwardRef((props, ref) => {
    const [rows, setRows] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const fetchProducts = () => {
        axios.get('http://localhost:8080/api/listar')
            .then(response => {
                const productsWithId = response.data.map((product) => ({
                    id: product.codigo,
                    name: product.nombre,
                    price: product.precio
                }));
                setRows(productsWithId);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchProducts
    }));

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    const handleUpdate = () => {
        fetchProducts();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'price', headerName: 'Precio', width: 130 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => (
                <div>
                    <button className={'btnEditar'} onClick={() => handleEditClick(params.row)}>Editar</button>
                    <button className={'btnEliminar'} onClick={() => handleDeleteClick(params.row)}>Eliminar</button>
                </div>
            )
        }
    ];

    return (
        <div className="data-grid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                className="data-grid"
                getRowId={(row) => row.id}
            />
            {isEditModalOpen && <EditModal product={selectedProduct} onClose={() => setEditModalOpen(false)} onUpdate={handleUpdate} />}
            {isDeleteModalOpen && <DeleteModal product={selectedProduct} onClose={() => setDeleteModalOpen(false)} onUpdate={handleUpdate} />}
        </div>
    );
});

export default TablaProductos;