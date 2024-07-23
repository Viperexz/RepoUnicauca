/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package simulatorCellProliferation;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.Tissue;

/**
 *
 * @author ahurtado
 */
public class CellSim extends Cell{
    VisualCell myVisualCell;

    public CellSim(VisualCell myVisualCell, Tissue tissue) {
        super(tissue);
        this.myVisualCell = myVisualCell;
    }

    public CellSim(VisualCell myVisualCell) {
        this.myVisualCell = myVisualCell;
    }
    
}
