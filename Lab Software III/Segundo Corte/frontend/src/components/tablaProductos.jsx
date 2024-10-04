import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import '../assets/css/tablaProductos.css';

export default function TablaProductos() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/listar')
            .then(response => {
                // Map the backend data to the required format
                const productsWithId = response.data.map((product) => ({
                    id: product.codigo, // Map codigo to id
                    name: product.nombre, // Map nombre to name
                    price: product.precio // Map precio to price
                }));
                setRows(productsWithId);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'price', headerName: 'Precio', width: 130 }
    ];

    return (
        <div className="data-grid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                className="data-grid"
                getRowId={(row) => row.id} // Specify custom id for each row
            />
        </div>
    );
}