/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.unicauca.cellproliferation;

import co.unicauca.cellproliferation.simpleExample.ViewTissueExample;
import java.util.Observable;

public class CellProliferationModel extends Observable {
    private Tissue tissue;
    private EventScheduler eventList;
    private int numIterations;

    public CellProliferationModel(Tissue tissue, EventScheduler eventList, int numIterations) {
        this.tissue = tissue;
        this.eventList = eventList;
        this.numIterations = numIterations;
    }

    public void addObserver(ViewTissueExample view) {
        addObserver((Observable o, Object arg) -> {
            view.update(o, arg);
            setChanged();
            notifyObservers(arg);
        });
    }

    public EventScheduler getEventList() {
        return eventList;
    }

    public void run() {
        for (int i = 0; i < numIterations; i++) {
            Event nextEvent = eventList.nextEvent();
            if (nextEvent != null) {
                tissue.executeDivision(nextEvent.getMyCell());
                setChanged();
                notifyObservers(nextEvent.getMyCell());
            }
        }
    }
}
