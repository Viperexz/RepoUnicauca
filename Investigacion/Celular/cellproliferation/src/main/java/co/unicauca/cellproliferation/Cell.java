/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;

import java.util.Random;

/**
 *
 * @author asilva, ahurtado
 */
public class Cell {
    private Tissue tissue;
    private double x;
    private double y;
    private int sides;

    public Cell(Tissue tissue, double x, double y) {
        this.tissue = tissue;
        this.x = x;
        this.y = y;
        this.sides = generateRandomSides();
    }

    public Tissue getTissue() {
        return tissue;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getSides() {
        return sides;
    }

    // Método para generar aleatoriamente el número de lados de la célula (entre 4 y 7)
    private int generateRandomSides() {
        Random random = new Random();
        return random.nextInt(4) + 4; // Número aleatorio entre 4 y 7
    }
}
