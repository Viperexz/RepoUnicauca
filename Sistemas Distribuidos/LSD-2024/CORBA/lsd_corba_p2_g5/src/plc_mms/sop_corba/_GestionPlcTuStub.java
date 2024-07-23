package plc_mms.sop_corba;


/**
* sop_corba/_GestionPlcTuStub.java .
* Generated by the IDL-to-Java compiler (portable), version "3.2"
* from gesplctu.idl
* martes 21 de mayo de 2024 03:52:35 PM COT
*/

public class _GestionPlcTuStub extends org.omg.CORBA.portable.ObjectImpl implements plc_mms.sop_corba.GestionPlcTu
{

  public boolean registrar_plctu (plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO dplctu)
  {
            org.omg.CORBA.portable.InputStream $in = null;
            try {
                org.omg.CORBA.portable.OutputStream $out = _request ("registrar_plctu", true);
                plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTOHelper.write ($out, dplctu);
                $in = _invoke ($out);
                boolean $result = $in.read_boolean ();
                return $result;
            } catch (org.omg.CORBA.portable.ApplicationException $ex) {
                $in = $ex.getInputStream ();
                String _id = $ex.getId ();
                throw new org.omg.CORBA.MARSHAL (_id);
            } catch (org.omg.CORBA.portable.RemarshalException $rm) {
                return registrar_plctu (dplctu        );
            } finally {
                _releaseReply ($in);
            }
  } // registrar_plctu

  public boolean consultarplctu (int plctuid, plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTOHolder objTU)
  {
            org.omg.CORBA.portable.InputStream $in = null;
            try {
                org.omg.CORBA.portable.OutputStream $out = _request ("consultarplctu", true);
                $out.write_long (plctuid);
                $in = _invoke ($out);
                boolean $result = $in.read_boolean ();
                objTU.value = plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTOHelper.read ($in);
                return $result;
            } catch (org.omg.CORBA.portable.ApplicationException $ex) {
                $in = $ex.getInputStream ();
                String _id = $ex.getId ();
                throw new org.omg.CORBA.MARSHAL (_id);
            } catch (org.omg.CORBA.portable.RemarshalException $rm) {
                return consultarplctu (plctuid, objTU        );
            } finally {
                _releaseReply ($in);
            }
  } // consultarplctu

  // Type-specific CORBA::Object operations
  private static String[] __ids = {
    "IDL:sop_corba/GestionPlcTu:1.0"};

  public String[] _ids ()
  {
    return (String[])__ids.clone ();
  }

  private void readObject (java.io.ObjectInputStream s) throws java.io.IOException
  {
     String str = s.readUTF ();
     String[] args = null;
     java.util.Properties props = null;
     org.omg.CORBA.ORB orb = org.omg.CORBA.ORB.init (args, props);
   try {
     org.omg.CORBA.Object obj = orb.string_to_object (str);
     org.omg.CORBA.portable.Delegate delegate = ((org.omg.CORBA.portable.ObjectImpl) obj)._get_delegate ();
     _set_delegate (delegate);
   } finally {
     orb.destroy() ;
   }
  }

  private void writeObject (java.io.ObjectOutputStream s) throws java.io.IOException
  {
     String[] args = null;
     java.util.Properties props = null;
     org.omg.CORBA.ORB orb = org.omg.CORBA.ORB.init (args, props);
   try {
     String str = orb.object_to_string (this);
     s.writeUTF (str);
   } finally {
     orb.destroy() ;
   }
  }
} // class _GestionPlcTuStub
