import "../../css/screens/coordinador/coordinadorDash.css";
import Menu from '../../components/menu';

function CoordinadorDash() {
    const rol = 1; // Define el rol aquí
    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol} />
            <div className={'dashContainer'}>
                <h1> Coordinador </h1>
                <p> Bienvenido al sistema gestor de resultados de aprendizaje.</p>
                <p> Navegue por las opciones de su derecha para interactuar con los diferentes modulos</p>
            </div>

        </div>
    );
}
export default CoordinadorDash;
