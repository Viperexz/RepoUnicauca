package grsaa.sop_rmi;

import grsaa.dto.Usuario_DTO;

import java.rmi.Remote;
import java.rmi.RemoteException;

//Hereda de la clase Remote, lo cual la convierte en interfaz remota
public interface GestionPlcMmsInt extends Remote {
    // Definicion del primer método remoto
    public void notificacionmms(int mmsid)throws RemoteException;
    // Definicion del segundo método remoto
}
