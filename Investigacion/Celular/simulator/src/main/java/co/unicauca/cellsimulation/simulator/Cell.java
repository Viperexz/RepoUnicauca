/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.unicauca.cellsimulation.simulator;

/**
 *
 * @author ahurtado
 */
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Random;

public class Cell
{
	public static ArrayList<Cell> cells = new ArrayList<Cell>();
	public static Random rand = new Random();
	public static int maxSpeed = 10;
	public static int initRad = 60;
	
	public Vector pos;
	public Vector vel;
	public int radius;
	
	public Cell() {
		this.pos = new Vector(rand.nextInt(Mitosis.WIDTH), rand.nextInt(Mitosis.HEIGHT));
		this.vel = new Vector((rand.nextInt(maxSpeed)*2 - maxSpeed), (rand.nextInt(maxSpeed)*2 - maxSpeed));
		this.radius = initRad;
		cells.add(this);
	}
	
	public Cell(Cell parent) {
		this.pos = parent.pos;
		this.vel = new Vector((rand.nextInt(maxSpeed)*2 - maxSpeed), (rand.nextInt(maxSpeed)*2 - maxSpeed));
		this.radius = parent.radius;
		cells.add(this);
	}
	
	public void show(Graphics g) {
		g.setColor(new Color(255, 0, 100, 100));
		g.fillOval((int)(this.pos.x - this.radius), (int)(this.pos.y - this.radius), this.radius*2, this.radius*2);
	}
	
	public void vibrate() {
		this.vel = new Vector((rand.nextInt(maxSpeed)*2 - maxSpeed + 1), (rand.nextInt(maxSpeed)*2 - maxSpeed + 1));
		this.pos = this.pos.add(vel);
	}
	
	public void mitose() {
		Cell childA = new Cell(this);
		Cell childB = new Cell(this);
		cells.remove(this);
	}
	
	public boolean onCellClicked(MouseEvent e) {
		Vector mousePos = new Vector(e.getX(), e.getY());
		System.out.println(Vector.getDistance(mousePos, this.pos));
		if (Vector.getDistance(mousePos, this.pos) < this.radius) {
			return true;
		}
		else {
			return false;
		}
	}
}
