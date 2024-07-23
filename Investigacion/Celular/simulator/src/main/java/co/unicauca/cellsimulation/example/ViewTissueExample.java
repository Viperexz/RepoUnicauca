/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.unicauca.cellsimulation.example;

import co.unicauca.cellproliferation.ViewTissue;
import java.util.Observable;

/**
 *
 * @author ahurtado
 */
public class ViewTissueExample implements ViewTissue{
    
    public ViewTissueExample() {
    }

    @Override
    public void update(Observable o, Object o1) {
     System.out.println("Mitosis de"+o1.toString()+"\n");
    }
    
}
