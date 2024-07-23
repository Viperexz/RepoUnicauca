/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;

import java.util.ListIterator;
import java.util.PriorityQueue;

public class EventScheduler {
    PriorityQueue<Event> eventList;

    public EventScheduler() {
        eventList = new PriorityQueue<>();
    }

    public void addDivisionEvent(Cell cell) {
        eventList.add(new Event(cell));
    }

    public Event nextEvent() {
        return eventList.poll();
    }

    public void init(Tissue tissue) {
        for (ListIterator<Cell> it = tissue.getCells().listIterator(); it.hasNext(); ) {
            this.addDivisionEvent(it.next());
        }
    }
}
