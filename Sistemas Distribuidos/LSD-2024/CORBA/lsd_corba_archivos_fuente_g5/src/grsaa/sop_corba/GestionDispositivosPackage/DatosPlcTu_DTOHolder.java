package grsaa.sop_corba.GestionDispositivosPackage;

/**
* grsaa/sop_corba/GestionDispositivosPackage/DatosPlcTu_DTOHolder.java .
* Generated by the IDL-to-Java compiler (portable), version "3.2"
* from gesdispositivos.idl
* jueves 6 de junio de 2024 12:24:05 PM COT
*/

public final class DatosPlcTu_DTOHolder implements org.omg.CORBA.portable.Streamable
{
  public grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO value = null;

  public DatosPlcTu_DTOHolder ()
  {
  }

  public DatosPlcTu_DTOHolder (grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO initialValue)
  {
    value = initialValue;
  }

  public void _read (org.omg.CORBA.portable.InputStream i)
  {
    value = grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTOHelper.read (i);
  }

  public void _write (org.omg.CORBA.portable.OutputStream o)
  {
    grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTOHelper.write (o, value);
  }

  public org.omg.CORBA.TypeCode _type ()
  {
    return grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTOHelper.type ();
  }

}
