package sop_corba.GestionUsuariosPackage;

/**
* sop_corba/GestionUsuariosPackage/usuarioDTOHolder.java .
* Generated by the IDL-to-Java compiler (portable), version "3.2"
* from gesusuarios.idl
* martes 14 de mayo de 2024 05:34:09 PM COT
*/

public final class usuarioDTOHolder implements org.omg.CORBA.portable.Streamable
{
  public sop_corba.GestionUsuariosPackage.usuarioDTO value = null;

  public usuarioDTOHolder ()
  {
  }

  public usuarioDTOHolder (sop_corba.GestionUsuariosPackage.usuarioDTO initialValue)
  {
    value = initialValue;
  }

  public void _read (org.omg.CORBA.portable.InputStream i)
  {
    value = sop_corba.GestionUsuariosPackage.usuarioDTOHelper.read (i);
  }

  public void _write (org.omg.CORBA.portable.OutputStream o)
  {
    sop_corba.GestionUsuariosPackage.usuarioDTOHelper.write (o, value);
  }

  public org.omg.CORBA.TypeCode _type ()
  {
    return sop_corba.GestionUsuariosPackage.usuarioDTOHelper.type ();
  }

}