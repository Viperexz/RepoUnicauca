import React from 'react';
import '../../assets/css/modal.css';

export function editarModal({ product, onClose,onUpdate }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const nombre = data.get('nombre');
        const precio = data.get('precio');

        const updatedProduct = {
            nombre,
            precio
        };

        try {
            const response = await fetch(`http://localhost:8080/api/${product.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                console.log('Product updated successfully');
                onUpdate();
                onClose(); // Close the modal after successful submission
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="modal">
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <label className={'label'} htmlFor="nombre">Nombre:</label>
                <input name="nombre" defaultValue={product.name} required/>
                <label className={'label'} htmlFor="nombre">Precio:</label>
                <input name="precio" defaultValue={product.price} required/>
                <button type='submit'>Guardar</button>
                <button type='button' onClick={onClose}>Cerrar</button>
            </form>
        </div>
    );
}