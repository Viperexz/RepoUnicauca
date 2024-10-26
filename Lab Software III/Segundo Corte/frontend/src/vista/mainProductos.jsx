import React, { useRef } from 'react';
import HeaderBar from "../components/headerBar.jsx";
import TablaProductos from "../components/tablaProductos.jsx";
import '../assets/css/mainProductos.css';
import Footer from "../components/footer.jsx";
import RegisterCard from "../components/registrarCard.jsx";

function mainProductos() {
    const tablaProductosRef = useRef();

    const handleFetchProducts = () => {
        if (tablaProductosRef.current) {
            tablaProductosRef.current.fetchProducts();
        }
    };

    return (
        <>
            <HeaderBar />
            <div className={'body'}>
                <RegisterCard onRegister={handleFetchProducts} />
                <h2>Productos:</h2>
                <TablaProductos ref={tablaProductosRef} />
                <Footer />
            </div>
        </>
    );
}

export default mainProductos;
