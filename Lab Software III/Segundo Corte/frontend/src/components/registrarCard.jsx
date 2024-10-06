import React from 'react';
import '../assets/css/card.css';

export default function registrarCard() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const nombre = data.get('nombre');
        const precio = data.get('precio');

        const product = {
            nombre,
            precio
        };

        try {
            const response = await fetch('http://localhost:8080/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                console.log('Product registered successfully');
            } else {
                console.error('Failed to register product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="register-card">
            <h2>Registrar producto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre del producto" required />
                <input type="number" name="precio" placeholder="Precio" required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}