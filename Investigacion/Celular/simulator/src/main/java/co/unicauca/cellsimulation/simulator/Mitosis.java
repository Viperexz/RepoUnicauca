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
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class Mitosis extends JPanel implements MouseListener{
	public static final int WIDTH = 1000;
	public static final int HEIGHT = 700;
	public static final int INIT_BAC = 3;
	
	public Mitosis() {
		this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
		this.setup();
		this.addMouseListener(this);
		Thread simulation = new Thread(new Runner());
		simulation.start();
	}
	
	public void addNotify() {
		super.addNotify();
		this.requestFocus();
	}
	
	public static void main(String[] args) {
		JFrame simulationFrame = new JFrame("Mitosis");
		simulationFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		simulationFrame.setContentPane(new Mitosis());
		simulationFrame.pack();
		simulationFrame.setVisible(true);
	}
	
	public void setup() {
		for(int i = 0; i < INIT_BAC; i++) {
			Cell firstGen = new Cell();
		}
	}
	
	
	public void showAllCells(Graphics g) {
		for (Cell c : Cell.cells) {
			c.show(g);
			c.vibrate();
		}
	}
	
	public void paintComponent(Graphics g) {
		//background
		g.setColor(Color.GRAY);
		g.fillRect(0, 0, WIDTH, HEIGHT);
		//animation
		showAllCells(g);
	}
	
	class Runner implements Runnable {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			while(true) {
				//System.out.println(Cell.cells.size());
				repaint();
				try {
					Thread.sleep(1000/60);
				} catch (Exception e) {}
			}
		}
		
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		for(Cell c : Cell.cells) {
			if(c.onCellClicked(e)) {
				System.out.println("Yes");
				c.mitose();
				break;
			}
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
	
}
