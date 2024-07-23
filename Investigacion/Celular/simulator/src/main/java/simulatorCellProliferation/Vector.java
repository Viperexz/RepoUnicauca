package simulatorCellProliferation;

import co.unicauca.cellsimulation.simulator.*;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ahurtado
 */
public class Vector 
{
	public double x;
	public double y;
	public double magnitude;
	
	public Vector(double _x, double _y)
	{
		this.x = _x;
		this.y = _y;
		this.magnitude = Math.sqrt((_x*_x) + (_y*_y));
	}
	
	/**
	 * adds two vectors
	 * @param _v2
	 * @return
	 */
	
	public Vector add(Vector _v2) 
	{
		return new Vector(this.x + _v2.x, this.y + _v2.y);
	}
	
	/**
	 * subtract vectors from each other
	 * @param _v2
	 * @return
	 */
	
	public Vector subtract(Vector _v2) 
	{
		return new Vector(this.x - _v2.x, this.y - _v2.y);
	}
	
	/**
	 * multiply every component
	 * of the vector by some coefficient
	 * @param coefficient
	 * @return
	 */
	
	public Vector multiply(double coefficient)
	{
		return new Vector(this.x * coefficient, this.y * coefficient);
	}
	
	/**
	 * divide every component of the vector
	 * by some coefficient
	 * @param coefficient
	 * @return
	 */
	
	public Vector divide(double coefficient)
	{
		return new Vector(this.x / coefficient, this.y / coefficient);
	}
	
	/**
	 * get the magnitude of the difference
	 * between two vectors (such as position)
	 */
	public static double getDistance(Vector _v1, Vector _v2)
	{
		return Math.sqrt( Math.pow(_v1.x - _v2.x, 2) + Math.pow(_v1.y - _v2.y, 2) );	
	}
}
