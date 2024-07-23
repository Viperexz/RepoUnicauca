package plc_mms.sop_rmi;

import plc_mms.dto.DatosPlcTu_DTO;
import plc_mms.dto.Usuario_DTO;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.Random;

public class GestionUsuariosImpl extends UnicastRemoteObject implements GestionUsuariosInt {

    private Usuario_DTO usuario = new Usuario_DTO(0,"Juanito Perez","adminoper","adminoper");
    private int sesionOPER;


    public GestionUsuariosImpl() throws RemoteException
    {
        System.out.println("En GestionUsuariosImpl()");
    }

    @Override
    public int abrirSesion(Usuario_DTO objUsuario) throws RemoteException {
        System.out.println("En Inciando Sesion.. "+ objUsuario.getUsuario());
        if(objUsuario.getUsuario().equals(usuario.getUsuario()) && objUsuario.getClave().equals(usuario.getClave()) ) {
            sesionOPER = 1;
            System.out.println("Incio correctamente.. "+ objUsuario.getUsuario());
        }
        else sesionOPER = 0;
        return sesionOPER;
    }

    @Override
    public Usuario_DTO consultarUsuario(int identificacion) throws RemoteException {
        System.out.println("Consultando el id: " + identificacion);
        //Se busca el usuario por un id, en caso de que lo encuentre se retornada el usuario. De lo contrario nUll
        if(identificacion==usuario.getId())
        {
            return usuario;
        }
        return null;
    }

    int buscarAdmin(Usuario_DTO obj)
    {
        System.out.println("Buscando el admin con el id" + obj.getId());
        // Si el admin coincide, se retornara 1, de lo contrario 0
        if(obj.getId()==usuario.getId() && obj.getUsuario() .equals(usuario.getUsuario()) && obj.getClave().equals(usuario.getClave()))
            return 1;
        return 0;
    }







}
