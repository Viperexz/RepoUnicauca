package co.unicauca.cellproliferation.simpleExample;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.RuleCellDivision;
import co.unicauca.cellproliferation.Tissue;

public class BySeparationPlane extends RuleCellDivision {

    private CellProliferationModel model;

    public BySeparationPlane(CellProliferationModel model) {
        this.model = model;
    }

    @Override
    public Tissue executeDivision(Cell cell) {
        // Realizar lógica de división de células
        // Aquí debes implementar la lógica específica de la división celular
        // Por ejemplo, puedes verificar el número de lados de la célula y decidir si debe dividirse o no
        // Además, genera nuevas células con características adecuadas y añádelas al modelo
        // Finalmente, notifica al modelo sobre el evento de división

        // Ejemplo básico:
        if (cell.getSides() >= 4 && cell.getSides() <= 7) {
            Cell newCell = new Cell(cell.getTissue(), cell.getX(), cell.getY()); // Puedes ajustar según tus necesidades
            model.getEventList().addDivisionEvent(newCell);
        }

        return cell.getTissue();
    }
}
