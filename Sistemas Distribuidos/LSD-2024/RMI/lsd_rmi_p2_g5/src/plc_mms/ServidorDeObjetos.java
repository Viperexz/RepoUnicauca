/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package plc_mms;

import plc_mms.sop_rmi.GestionPlcTuImpl;
import plc_mms.sop_rmi.GestionUsuariosImpl;
import plc_mms.utilidades.UtilidadesRegistroS;
import plc_mms.utilidades.UtilidadesConsola;
import java.rmi.RemoteException;
import plc_mms.sop_rmi.GestionUsuariosImpl;

public class ServidorDeObjetos {
    public static void main(String args[]) throws RemoteException {

        int numPuertoRMIRegistry = 0;
        String direccionIpRMIRegistry = "";

        System.out.println("Cual es el la direcciOn ip donde se encuentra  el rmiregistry ");
        direccionIpRMIRegistry = UtilidadesConsola.leerCadena();
        System.out.println("Cual es el nUmero de puerto por el cual escucha el rmiregistry ");
        numPuertoRMIRegistry = UtilidadesConsola.leerEntero();

        GestionUsuariosImpl objRemoto = new GestionUsuariosImpl();// se leasigna el puerto de escucha del objeto remoto
        GestionPlcTuImpl objRemoto2 = new GestionPlcTuImpl(direccionIpRMIRegistry,numPuertoRMIRegistry);// se leasigna el puerto de escucha del objeto remoto

        try {
            UtilidadesRegistroS.arrancarNS(numPuertoRMIRegistry);
            UtilidadesRegistroS.RegistrarObjetoRemoto(objRemoto, direccionIpRMIRegistry, numPuertoRMIRegistry, "GesUsuario");
            UtilidadesRegistroS.RegistrarObjetoRemoto(objRemoto2, direccionIpRMIRegistry, numPuertoRMIRegistry, "GesPlctu");

        } catch (Exception e) {
            System.err.println("No fue posible Arrancar el NS o Registrar el objeto remoto" + e.getMessage());
        }

    }
}
