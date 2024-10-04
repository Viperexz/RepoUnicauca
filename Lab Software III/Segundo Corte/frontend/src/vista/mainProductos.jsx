import HeaderBar from "../components/HeaderBar.jsx";
import TablaProductos from "../components/tablaProductos.jsx";
import '../assets/css/mainProductos.css';

function mainProductos() {
    return (
        <>
            <HeaderBar />
            <body className={'body'}>
            <TablaProductos />
            </body>

        </>
    )
}

export default mainProductos
