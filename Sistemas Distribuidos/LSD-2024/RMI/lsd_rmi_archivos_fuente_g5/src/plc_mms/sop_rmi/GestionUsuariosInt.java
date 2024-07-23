package plc_mms.sop_rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

import plc_mms.dto.DatosPlcTu_DTO;
import plc_mms.dto.Usuario_DTO;
//Hereda de la clase Remote, lo cual la convierte en interfaz remota
public interface GestionUsuariosInt extends Remote {
    // Definicion del primer método remoto
    public int abrirSesion(Usuario_DTO objUsuario) throws RemoteException;
    // Definicion del segundo método remoto
    public Usuario_DTO consultarUsuario(int identificacion) throws RemoteException;



}
