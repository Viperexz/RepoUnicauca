/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package plc_mms;


import org.omg.CosNaming.*;
import org.omg.CORBA.*;
import org.omg.PortableServer.*;
import org.omg.PortableServer.POA;

import plc_mms.sop_corba.*;


public class ServidorDeObjetos
{

    public static void main(String args[])
    {
        try{

            System.out.println("1. Crea e inicia el orb");
            ORB orb = ORB.init(args, null);
            System.out.println("2. Obtiene la referencia al poa raiz, por medio del orb ");
            org.omg.CORBA.Object objPOA = null;
            objPOA=orb.resolve_initial_references("RootPOA");
            POA rootPOA = POAHelper.narrow(objPOA);

            System.out.println("3. Activa el POAManager");
            rootPOA.the_POAManager().activate();

            System.out.println("4. Crea el objeto servant");

            GestionUsuariosImpl ObjServant = new GestionUsuariosImpl();
            GestionPlcTuImpl ObjServant1 = new GestionPlcTuImpl();

            System.out.println("5. Obtiene la referencia al objeto servant ");
            org.omg.CORBA.Object obj = rootPOA.servant_to_reference(ObjServant);
            org.omg.CORBA.Object obj1 = rootPOA.servant_to_reference(ObjServant1);
            System.out.println("6. Convierte la referencia de un objeto generico a una referencia al servant ");
            GestionUsuarios href = GestionUsuariosHelper.narrow(obj);
            GestionPlcTu href1 = GestionPlcTuHelper.narrow(obj1);
            System.out.println("7. Obtiene una referencia al servicio de nombrado por medio del orb");
            org.omg.CORBA.Object objRefNameService =
                    orb.resolve_initial_references("NameService");

            System.out.println("8. Convierte la ref genErica a ref de NamingContextExt");
            NamingContextExt refContextoNombrado = NamingContextExtHelper.narrow(objRefNameService);

            System.out.println("9.Construir un contexto de nombres que identifica al servant");

            System.out.println("Realizar binding de objNotificaciones ...");
            String identificadorServant = "ServUsuarios";
            NameComponent path[] = refContextoNombrado.to_name(identificadorServant);
            String identificadorServant1 = "ServGesTU";
            NameComponent path1[] = refContextoNombrado.to_name(identificadorServant1);

            refContextoNombrado.rebind(path, href);
            refContextoNombrado.rebind(path1, href1);

            ObjServant1.consultarReferenciaRemota(refContextoNombrado,"ServGrsaa");

            System.out.println("El Servidor esta listo y esperando ...");
            orb.run();





        }

        catch (Exception e) {
            System.err.println("ERROR: " + e);
            e.printStackTrace(System.out);
        }




    }
}
