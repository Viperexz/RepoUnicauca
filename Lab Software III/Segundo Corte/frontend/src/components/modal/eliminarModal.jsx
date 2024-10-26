import React from 'react';
import '../../assets/css/modal.css';

export function eliminarModal({ product, onClose, onUpdate}) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const codigo = product.id;
        const nombre = product.name;
        const precio = product.price

        const updatedProduct = {
            codigo,
            nombre,
            precio
        };
        try {
            const response = await fetch(`http://localhost:8080/api/eliminar`, {
                method: 'DELETE',
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
            <h2>Eliminar Producto</h2>
            <p>¿Estás seguro de que deseas eliminar {product.name}?</p>
            <form onSubmit={handleSubmit}>
            <button onClick={onClose}>Cancelar</button>
            <button type={"submit"} onClick={() => {
            }}>Eliminar</button>
            </form>
        </div>
    );
}