/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;


/**
 *
 * @author ahurtado
 */

import java.util.Random;

public class Event implements Comparable<Event> {
    private Cell myCell;
    private long timeStamp;

    public Event(Cell cell) {
        myCell = cell;
        timeStamp = System.currentTimeMillis();
    }

    public Cell getMyCell() {
        return myCell;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    @Override
    public int compareTo(Event e) {
        return Long.compare(timeStamp, e.timeStamp);
    }
}
