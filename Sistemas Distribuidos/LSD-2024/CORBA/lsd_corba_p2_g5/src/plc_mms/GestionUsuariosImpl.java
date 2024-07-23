package plc_mms;

import plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTO;
import plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTOHolder;

public class GestionUsuariosImpl extends plc_mms.sop_corba.GestionUsuariosPOA  {

    usuarioDTO varUsuario = new usuarioDTO(0,"Operador","admin-oper","admin-oper");

    @Override
    public int abrirSesion(usuarioDTO objUsuario) {
        System.out.println("En Inciando Sesion.. "+ objUsuario.usuario);
        if(objUsuario.usuario.equals(varUsuario.usuario) && objUsuario.clave.equals(varUsuario.clave) ) {
            System.out.println("Incio correctamente.. "+ objUsuario.usuario);
            return 1;
        }
       return 0;
    }

    @Override
    public boolean consultarUsuario(int id, usuarioDTOHolder objUsuario) {
        System.out.println("Consultando el id: " + id);
        //Se busca el usuario por un id, en caso de que lo encuentre se retornada el usuario. De lo contrario nUll
        if(id==varUsuario.id)
        {
            objUsuario.value =varUsuario;
            return true;
        }
        return false;
    }
}
