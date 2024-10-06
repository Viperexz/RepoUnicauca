import HeaderBar from "../components/headerBar.jsx";
import TablaProductos from "../components/tablaProductos.jsx";
import '../assets/css/mainProductos.css';
import Footer from "../components/footer.jsx";
import RegisterCard from "../components/registrarCard.jsx";
function mainProductos() {
    return (
        <>
            <HeaderBar />
            <div className={'body'}>
                <RegisterCard />
                <h2>Productos:</h2>
                <TablaProductos/>
                <Footer />
            </div>

        </>
    )
}

export default mainProductos
