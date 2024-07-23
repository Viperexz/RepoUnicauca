/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellsimulation.example;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.RuleCellDivision;
import co.unicauca.cellproliferation.Tissue;

/**
 *
 * @author asilva,ahurtado
 */
public class BySeparationPlane extends RuleCellDivision{
    
    CellProliferationModel model;

    public BySeparationPlane(CellProliferationModel model) {
        this.model = model;
    }

    /**
     *
     * @param cell
     * @return
     */
    @Override
    public Tissue executeDivision(Cell cell) {
        Cell newCell = new Cell(cell.getTissue());
        model.getEventList().addDivisionEvent(newCell);
        return cell.getTissue();
    }
    
}
