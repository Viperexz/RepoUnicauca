package grsaa.sop_rmi;

import grsaa.dto.Usuario_DTO;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class GestionPlcMmsIntImpl extends UnicastRemoteObject implements GestionPlcMmsInt {
    private Usuario_DTO usuario = new Usuario_DTO(0,"Juanito Perez","adminoper","adminoper");
    private int sesionOPER;



    public GestionPlcMmsIntImpl() throws RemoteException
    {
        System.out.println("En GestionUsuariosImpl()");
    }

    @Override
    public void notificacionmms(int mmsid)throws RemoteException {
        System.out.println("El dispositivo PLC_MMS con Id:"+ mmsid +" completo sus registros y esta activo en el sistema");
    }
}
