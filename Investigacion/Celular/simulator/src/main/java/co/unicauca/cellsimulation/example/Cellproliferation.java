/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */

package co.unicauca.cellsimulation.example;
//import numpy as np
//import matplotlib.pyplot as plt

import co.unicauca.cellproliferation.simpleExample.BySeparationPlane;
import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.EventScheduler;
import co.unicauca.cellproliferation.Tissue;

//import cbmos
//import cbmos.force_functions as ff
//import cbmos.solvers.euler_forward as ef
//import cbmos.cell as cl
//import cbmos.utils as utils
//import cbmos.events as events

/**
 *
 * @author ahurtado
 */
public class Cellproliferation {

    public static void main(String[] args) { 
        int numIteraciones=10; 
        Tissue t = new Tissue();
        t.initialPopulation();
        EventScheduler event_list = new EventScheduler();
        event_list.init(t);  
        CellProliferationModel model = new CellProliferationModel(t,event_list, numIteraciones);
        model.addObserver(new co.unicauca.cellproliferation.simpleExample.ViewTissueExample());
        t.addDivisionRule(new BySeparationPlane(model));
        model.run();
    }
}
