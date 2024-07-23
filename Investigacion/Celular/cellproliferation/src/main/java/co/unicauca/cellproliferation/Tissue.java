/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;

import java.util.ArrayList;
import java.util.List;

public class Tissue {
    protected RuleCellDivision rule;
    protected List<Cell> cells;

    public void initialPopulation(List<Cell> initialCells) {
        cells = new ArrayList<>(initialCells);
    }

    public void addDivisionRule(RuleCellDivision rule) {
        this.rule = rule;
    }

    public List<Cell> getCells() {
        return cells;
    }

    public Tissue executeDivision(Cell myCell) {
        return rule.executeDivision(myCell);
    }
}
