package co.unicauca.cellproliferation.simpleExample;

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.EventScheduler;
import co.unicauca.cellproliferation.Tissue;
import java.util.ArrayList;
import java.util.List;

public class Cellproliferation {

    public static void main(String[] args) {
        int numIterations = 10;
        Tissue t = new Tissue();
        List<Cell> initialCells = generateInitialCells(10);
        t.initialPopulation(initialCells);
        EventScheduler eventList = new EventScheduler();
        eventList.init(t);
        CellProliferationModel model = new CellProliferationModel(t, eventList, numIterations);
        model.addObserver(new ViewTissueExample());
        t.addDivisionRule(new BySeparationPlane(model));
        model.run();
    }

    private static List<Cell> generateInitialCells(int numCells) {
        List<Cell> initialCells = new ArrayList<>();
        for (int i = 0; i < numCells; i++) {
            initialCells.add(new Cell(null, Math.random() * 100, Math.random() * 100));
        }
        return initialCells;
    }
}