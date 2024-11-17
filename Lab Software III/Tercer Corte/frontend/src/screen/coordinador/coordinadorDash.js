import "../../css/screens/coordinador/coordinadorDash.css";
import Menu from '../../components/menu';

function CoordinadorDash() {
    const rol = 1; // Define el rol aquí
    return (
        <div className={'backgroundContainer'}>
            <Menu rol={rol} />
            <div>
                <h1>Coordinador</h1>
            </div>

        </div>
    );
}
export default CoordinadorDash;
