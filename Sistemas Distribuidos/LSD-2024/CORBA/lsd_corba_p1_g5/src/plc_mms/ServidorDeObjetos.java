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

import sop_corba.*;


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

            System.out.println("5. Obtiene la referencia al objeto servant ");
            org.omg.CORBA.Object obj =
                    rootPOA.servant_to_reference(ObjServant);
            System.out.println("6. Convierte la referencia de un objeto generico a una referencia al servant ");
            GestionUsuarios href = GestionUsuariosHelper.narrow(obj);

            System.out.println("7. Obtiene una referencia al servicio de nombrado por medio del orb");
            org.omg.CORBA.Object objRefNameService =
                    orb.resolve_initial_references("NameService");

            System.out.println("8. Convierte la ref genErica a ref de NamingContextExt");
            NamingContextExt refContextoNombrado = NamingContextExtHelper.narrow(objRefNameService);

            System.out.println("9.Construir un contexto de nombres que identifica al servant");
            String identificadorServant = "identificadorServant";

            NameComponent [] path = new NameComponent[1];
            path[0] = new NameComponent();
            path[0].id = identificadorServant;
            path[0].kind = "tipoServicio";

            System.out.println("10.Realiza el binding de la referencia de objeto en el N_S");
            refContextoNombrado.rebind(path, href);

            System.out.println("El Servidor esta listo y esperando ...");
            orb.run();


        }

        catch (Exception e) {
            System.err.println("ERROR: " + e);
            e.printStackTrace(System.out);
        }


    }
}
