package grsaa;

import grsaa.sop_corba.GestionDispositivosPackage.notificacionDTO;

public class GestionDispositivosImpl extends grsaa.sop_corba.GestionDispositivosPOA{

    @Override
    public void notificacionmms(notificacionDTO objNotificacion) {
        System.out.println("El dispositivo PLC_MMS con Id:"+ objNotificacion.idPlcmms +" completo sus registros y esta activo en el sistema");

    }
}
