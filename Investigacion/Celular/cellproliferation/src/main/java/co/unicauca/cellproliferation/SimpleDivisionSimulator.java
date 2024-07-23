/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SimpleDivisionSimulator {

    private List<Cell> cells;
    private double maxX;
    private double maxY;
    private Random random;

    public SimpleDivisionSimulator(double maxX, double maxY) {
        cells = new ArrayList<>();
        this.maxX = maxX;
        this.maxY = maxY;
        this.random = new Random();
    }

    public void addCell(Cell cell) {
        cells.add(cell);
    }

    public List<Cell> simulateDivision() {
        List<Cell> newCells = new ArrayList<>();

        for (Cell cell : cells) {
            // Simula la división creando nuevas células cerca de la célula existente
            for (int i = 0; i < random.nextInt(3) + 1; i++) {
                double offsetX = random.nextDouble() * 10 - 5; // Ajusta según tus necesidades
                double offsetY = random.nextDouble() * 10 - 5; // Ajusta según tus necesidades

                double newX = cell.getX() + offsetX;
                double newY = cell.getY() + offsetY;

                // Limita las nuevas células a estar dentro del área definida
                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                newCells.add(new Cell(null, newX, newY));
            }
        }

        return newCells;
    }
}