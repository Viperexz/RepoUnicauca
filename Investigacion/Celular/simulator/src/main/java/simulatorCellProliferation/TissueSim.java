/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package simulatorCellProliferation;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.Tissue;
import java.util.ArrayList;
import static simulatorCellProliferation.ViewTissueMouseEvent.INIT_BAC;

/**
 *
 * @author ahurtado
 */
public class TissueSim extends Tissue{
    
     public void initialPopulation(){
        cells = new ArrayList<>();
        for(int i = 0; i < INIT_BAC; i++) {
			VisualCell firstGen = new VisualCell(this);
		}
    }
    
}
