package plc_tu;

import plc_tu.sop_corba.GestionAlertasPOA;
import plc_tu.sop_corba.GestionAlertasPackage.alertaDto;
import org.omg.CORBA.*;

import javax.swing.*;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class UsuarioCllbckImpl extends GestionAlertasPOA
{
    private ORB orb;
    public void setORB(ORB orb_val) {
        orb = orb_val;
    }
    @Override
    public void notificar(alertaDto objAlerta) {
        Thread thread = new Thread(() -> {

            if(objAlerta.modo == 1)
            {
                JOptionPane.showMessageDialog(
                        null,
                        "El usuario: " + objAlerta.usuario + " con id: " + objAlerta.id + " está realizando una consulta.",
                        "Notificación", JOptionPane.INFORMATION_MESSAGE);
            }
            else
            {
                JOptionPane.showMessageDialog(
                        null,
                        "La factura del PLC:TU id plc_tu "+objAlerta.id+" esta lista y ya puede ser consultada",
                        "Notificación", JOptionPane.INFORMATION_MESSAGE);
            }


        });


        thread.start();
    }
}

