/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package simulatorCellProliferation;

/**
 *
 * @author ahurtado
 */

import co.unicauca.cellproliferation.Cell;
import co.unicauca.cellproliferation.Tissue;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Random;

public class VisualCell
{
	public static ArrayList<VisualCell> cells = new ArrayList<VisualCell>();
	public static Random rand = new Random();
	public static int maxSpeed = 10;
	public static int initRad = 60;
        private CellSim cell;
        private Tissue tissue;
	
	public Vector pos;
	public Vector vel;
	public int radius;
	
	public VisualCell(Tissue tissue) {
		this.pos = new Vector(rand.nextInt(ViewTissueMouseEvent.WIDTH), rand.nextInt(ViewTissueMouseEvent.HEIGHT));
		this.vel = new Vector((rand.nextInt(maxSpeed)*2 - maxSpeed), (rand.nextInt(maxSpeed)*2 - maxSpeed));
		this.radius = initRad;
                this.tissue = tissue;
                this.cell = new CellSim(this,tissue);
		cells.add(this);
	}
	
	public VisualCell(VisualCell parent) {
		this.pos = parent.pos;
		this.vel = new Vector((rand.nextInt(maxSpeed)*2 - maxSpeed), (rand.nextInt(maxSpeed)*2 - maxSpeed));
		this.radius = parent.radius;
                this.tissue = parent.tissue;
                this.cell = new CellSim(this,tissue);
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
                cell.getTissue().executeDivision(cell);
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

    /**
     * @return the cell
     */
    public Cell getCell() {
        return cell;
    }

    /**
     * @param cell the cell to set
     */
    public void setCell(CellSim cell) {
        this.cell = cell;
    }
}
