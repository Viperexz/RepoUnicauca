package plc_mms.sop_corba;


/**
* plc_mms/sop_corba/GestionUsuariosOperations.java .
* Generated by the IDL-to-Java compiler (portable), version "3.2"
* from gesusuarios.idl
* martes 28 de mayo de 2024 05:03:03 PM COT
*/

public interface GestionUsuariosOperations 
{
  int abrirSesion (plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTO objUsuario);
  boolean consultarUsuario (int id, plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTOHolder objUsuario);
} // interface GestionUsuariosOperations
