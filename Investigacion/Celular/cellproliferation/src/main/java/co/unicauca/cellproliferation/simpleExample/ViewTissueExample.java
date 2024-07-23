/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.unicauca.cellproliferation.simpleExample;

import co.unicauca.cellproliferation.ViewTissue;

import java.util.Observable;

public class ViewTissueExample implements ViewTissue {
    public ViewTissueExample() {
    }

    @Override
    public void update(Observable o, Object arg) {
        System.out.println("Mitosis de " + arg.toString() + "\n");
    }
}