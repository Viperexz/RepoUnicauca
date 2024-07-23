/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package grsaa;

import grsaa.sop_rmi.GestionPlcMmsIntImpl;
import grsaa.utilidades.UtilidadesConsola;
import grsaa.utilidades.UtilidadesRegistroS;

import java.rmi.RemoteException;

public class ServidorDeObjetos2 {
    public static void main(String args[]) throws RemoteException {

        int numPuertoRMIRegistry = 0;
        String direccionIpRMIRegistry = "";

        System.out.println("Cual es el la direcciOn ip donde se encuentra  el rmiregistry ");
        direccionIpRMIRegistry = UtilidadesConsola.leerCadena("Ingrese la IP (localhost o otra): ");
        System.out.println("Cual es el nUmero de puerto por el cual escucha el rmiregistry ");
        numPuertoRMIRegistry = UtilidadesConsola.leerEntero();

        GestionPlcMmsIntImpl objRemoto = new GestionPlcMmsIntImpl(direccionIpRMIRegistry,numPuertoRMIRegistry);// se leasigna el puerto de escucha del objeto remoto

        try {
            UtilidadesRegistroS.arrancarNS(numPuertoRMIRegistry);
            UtilidadesRegistroS.RegistrarObjetoRemoto(objRemoto, direccionIpRMIRegistry, numPuertoRMIRegistry,"GesPlcMms");

        } catch (Exception e) {
            System.err.println("No fue posible Arrancar el NS o Registrar el objeto remoto" + e.getMessage());
        }

    }
}
