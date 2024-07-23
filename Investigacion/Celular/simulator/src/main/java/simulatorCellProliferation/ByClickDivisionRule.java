/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package simulatorCellProliferation;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.RuleCellDivision;
import co.unicauca.cellproliferation.Tissue;
import static simulatorCellProliferation.VisualCell.cells;

/**
 *
 * @author ahurtado
 */
public class ByClickDivisionRule extends RuleCellDivision {

    private CellProliferationModel model;

    public ByClickDivisionRule(CellProliferationModel model) {
        this.model = model;
    }
    
    
    
    @Override
    public Tissue executeDivision(Cell cell) {
                CellSim currentCell = (CellSim) cell;
                CellSim child1 = new CellSim(currentCell.myVisualCell);
                CellSim child2 = new CellSim(currentCell.myVisualCell);
                model.getTissue().getCells().add(child1);
                model.getTissue().getCells().add(child2);
                VisualCell childA = new VisualCell(currentCell.myVisualCell);
		VisualCell childB = new VisualCell(currentCell.myVisualCell);
		cells.remove(currentCell.myVisualCell);
                model.getTissue().getCells().remove(cell);
                return model.getTissue();
    } 
}
