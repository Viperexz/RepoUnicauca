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

import co.unicauca.cellproliferation.CellProliferationModel;
import co.unicauca.cellproliferation.EventScheduler;
import co.unicauca.cellproliferation.ViewTissue;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Observable;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class ViewTissueMouseEvent extends JPanel implements MouseListener, ViewTissue{
	public static final int WIDTH = 1000;
	public static final int HEIGHT = 700;
	public static final int INIT_BAC = 3;
        private TissueSim tissue;
        private CellProliferationModel model;
        private EventScheduler event_list;
	
	public ViewTissueMouseEvent() {
                this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
		this.setup();
		this.addMouseListener(this);
		Thread simulation = new Thread(new Runner());
		simulation.start();
                model.run();
	}
	
	
        public static void main(String[] args) {
		JFrame simulationFrame = new JFrame("Simulación de la Mitosis");
		simulationFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		simulationFrame.setContentPane(new ViewTissueMouseEvent());
		simulationFrame.pack();
		simulationFrame.setVisible(true);
	}
        
        
        public void addNotify() {
		super.addNotify();
		this.requestFocus();
	}
	
	
	
	public void setup() {
                tissue = new TissueSim();
                event_list = new EventScheduler();
                //event_list.init(tissue);  
                model = new CellProliferationModel(tissue,event_list,-1);
                model.addObserver(this);
                tissue.addDivisionRule(new ByClickDivisionRule(model));
		tissue.initialPopulation();      
	}
	
	
	public void showAllCells(Graphics g) {
		for (VisualCell c : VisualCell.cells) {
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

    @Override
    public void update(Observable o, Object o1) {
        //Graphics g = this.getGraphics();
        //g.setColor(Color.YELLOW);
	//g.fillRect(0, 0, WIDTH, HEIGHT);
	//animation
	//showAllCells(g);
    }
	
	class Runner implements Runnable {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			while(true) {
				//System.out.println(VisualTissue.cells.size());
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
		for(VisualCell c : VisualCell.cells) {
			if(c.onCellClicked(e)) {
				System.out.println("Yes");
				event_list.addDivisionEvent(c.getCell());
                                model.run();
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
