package plc_tu;

import org.omg.CORBA.Object;
import org.omg.CosNaming.*;
import org.omg.CORBA.*;
import org.omg.PortableServer.POA;
import org.omg.PortableServer.POAHelper;
import org.omg.PortableServer.POAManagerPackage.AdapterInactive;
import org.omg.PortableServer.POAPackage.ServantNotActive;
import org.omg.PortableServer.POAPackage.WrongPolicy;
import plc_mms.GestionPlcTuImpl;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTOHolder;
import plc_tu.sop_corba.GestionAlertas;
import plc_tu.sop_corba.GestionAlertasHelper;
import plc_tu.utilidades.UtilidadesConsola;
import plc_mms.sop_corba.*;
import org.omg.CORBA.ORBPackage.InvalidName;
import org.omg.CosNaming.NamingContextPackage.CannotProceed;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTO;

public class ClienteDeObjetos
    {
        public static void main(String args[])
        {
            try
            {
                System.out.println("1. Crea e inicia el ORB");
                ORB orb = ORB.init(args, null);

                System.out.println("2. Obtiene una referencia al servicio de nombrado por medio del orb");
                Object objRefNameService = orb.resolve_initial_references("NameService");

                POA rootpoa = POAHelper.narrow(orb.resolve_initial_references("RootPOA"));
                System.out.println("3. Activa el POAManager");
                rootpoa.the_POAManager().activate();
                System.out.println("3. Convierte la ref genErica a ref de NamingContextExt");
                NamingContextExt refContextoNombrado = NamingContextExtHelper.narrow(objRefNameService);

                System.out.println("4. Resuelve la referencia del objeto en el N_S.");

                String identificadorServant = "ServUsuarios";
                String identificadorServant1 = "ServGesTU";

                NameComponent path[] = refContextoNombrado.to_name(identificadorServant);
                NameComponent path1[] = refContextoNombrado.to_name(identificadorServant1);

                Object objRef= refContextoNombrado.resolve(path);
                Object objRef1= refContextoNombrado.resolve(path1);

                System.out.println("5. Convierte la referencia de un objeto genErico a una referencia al servant ");

                GestionUsuarios objUsuarios = GestionUsuariosHelper.narrow(objRef);
                System.out.println("Se obtuvo Obj usuarios");



                GestionPlcTu objTu = GestionPlcTuHelper.narrow(objRef1);
                System.out.println("Se obtuvo Obj Tu");
                System.out.println("InvocaciOn de los metodos como si fueran locales");



                System.out.println("7. Crea el objeto servant callback");
                UsuarioCllbckImpl objRefCllbck = new UsuarioCllbckImpl();
                objRefCllbck.setORB(orb);

                System.out.println("8. Convierte la referencia de un objeto genErico a una referencia al servant callback");
                org.omg.CORBA.Object ref = rootpoa.servant_to_reference(objRefCllbck);
                GestionAlertas objAlertasCallback = GestionAlertasHelper.narrow(ref);

                menuSesion(objUsuarios,objTu,objAlertasCallback);


            } catch (InvalidName | CannotProceed | org.omg.CosNaming.NamingContextPackage.InvalidName | NotFound e)
            {
                System.out.println("ERROR : " + e.getMessage()) ;
                e.printStackTrace(System.out);
            } catch (WrongPolicy e) {
                throw new RuntimeException(e);
            } catch (AdapterInactive e) {
                throw new RuntimeException(e);
            } catch (ServantNotActive e) {
                throw new RuntimeException(e);
            }
        }




    private static void menuSesion(GestionUsuarios objGestion, GestionPlcTu objTu, GestionAlertas objAlertas) {
        int opcion = 0;
        String password;
        String user;
        int ID;
         usuarioDTO usuario = null;
        do{
        System.out.println("=== Menu Sesion ===");
        System.out.println("1. Abrir Sesion");
        System.out.println("2. Salir");

            System.out.println("Digite una opcion:");
            opcion = UtilidadesConsola.leerEntero();

            switch(opcion) {
                case 1:
                    System.out.println("Ingrese las credenciales");
                    System.out.println("");
                    System.out.println("ID:");
                    ID = UtilidadesConsola.leerEntero();
                    user = UtilidadesConsola.leerCadena("Ingresar Usuario:");
                    password = UtilidadesConsola.leerCadena("Ingresar Password");
                    usuario = new usuarioDTO(ID,"",user,password);
                    if (objGestion.abrirSesion(usuario)==1) {
                        menuOperador(objTu,objAlertas);
                    }
                    else {
                        menuUsuario(objTu);
                    }
                    break;

                case 2:
                    System.out.println("Saliendo...");
                    System.exit(0); // Terminar el programa
                    break;
                default:
                    System.out.println("El número ingresado no está en las opciones");
                    break;
            }
        }while(opcion != 2);
    }

    private static void menuOperador(GestionPlcTu objTu, GestionAlertas objAlertas) {
        int opcion = 0;
        objTu.registrarCallback(objAlertas);
        String id_plctu;
        String propietario;
        String direccion;
        int consumo = 0;
        DatosPlcTu_DTO datosTu;

        do{
            System.out.println("=== Menu Operador ===");
            System.out.println("1. Registrar Dispositivo");
            System.out.println("2. Consultar Dispositivo");
            System.out.println("3. Salir");
            System.out.println("");
                System.out.println("Digite una opcion:");
                opcion = UtilidadesConsola.leerEntero();
                switch(opcion) {
                    case 1:
                        System.out.println("=== Registro PLC_TU ===");
                        id_plctu = UtilidadesConsola.leerCadena("Ingrese el ID: ");
                        direccion = UtilidadesConsola.leerCadena("Ingrese el Direccion: ");
                        propietario = UtilidadesConsola.leerCadena("Ingrese el Propeitario : ");
                        datosTu = new DatosPlcTu_DTO(id_plctu,propietario,direccion,consumo);
                        if(objTu.registrar_plctu(datosTu))
                        {
                            System.out.println("Dispositivo registrado");
                        }
                        else
                        {
                            System.out.println("Error al registrar el dispositivo");
                        }
                        break;
                    case 2:
                        String ConsultaID = UtilidadesConsola.leerCadena("Ingrese el ID: ");
                        DatosPlcTu_DTOHolder recuperado = new DatosPlcTu_DTOHolder();
                        objTu.consultarplctu(Integer.parseInt(ConsultaID),recuperado);

                        if( recuperado != null)      {
                            System.out.println("ID: " + recuperado.value.id_plctu);
                            System.out.println("Direccion: "+recuperado.value.direccion);
                            System.out.println("Propietario: "+recuperado.value.propietario);
                            System.out.println("Consumo: "+recuperado.value.consumo);
                        }
                        else
                        {
                            System.out.println("Inexistente");
                        }

                        break;
                    case 3:
                        System.out.println("Saliendo...");
                        System.exit(0); // Terminar el programa
                        break;
                    default:
                        System.out.println("El número ingresado no está en las opciones");
                        break;
                }
        }while(opcion != 3);
    }

    private static void menuUsuario(GestionPlcTu objTu) {
        int opcion = 0;
        do{
        System.out.println("=== Menu Usuario ===");
        System.out.println("1. Consultar Dispositivo");
        System.out.println("2. Salir");
        System.out.println("");


            System.out.println("Digite una opcion:");
            opcion = UtilidadesConsola.leerEntero();

            switch(opcion) {
                case 1:
                    String ConsultaID = UtilidadesConsola.leerCadena("Ingrese el ID: ");
                    DatosPlcTu_DTOHolder recuperado = new DatosPlcTu_DTOHolder();
                    objTu.consultarplctu(Integer.parseInt(ConsultaID),recuperado);

                    if( recuperado != null)      {
                        System.out.println("ID: " + recuperado.value.id_plctu);
                        System.out.println("Direccion: "+recuperado.value.direccion);
                        System.out.println("Propietario: "+recuperado.value.propietario);
                        System.out.println("Consumo: "+recuperado.value.consumo);
                    }
                    else
                    {
                        System.out.println("Inexistente");
                    }

                    break;
                case 2:
                    System.out.println("Saliendo...");
                    System.exit(0); // Terminar el programa
                    break;
                default:
                    System.out.println("El número ingresado no está en las opciones");
                    break;
            }
        }while(opcion != 2);
    }
    }
