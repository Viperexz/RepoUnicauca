package plc_tu;

import plc_tu.utilidades.UtilidadesRegistroS;
import plc_tu.utilidades.UtilidadesConsola;

import plc_mms.sop_rmi.*;
import plc_mms.dto.*;
import java.rmi.Naming;
import java.rmi.NotBoundException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.rmi.RemoteException;

public class ClienteDeObjetos {

    private static GestionUsuariosInt objRemoto;

    public static void main(String[] args) throws RemoteException {
        int numPuertoRMIRegistry = 0;
        String direccionIpRMIRegistry = "";

        System.out.println("Cual es el la direcciOn ip donde se encuentra  el rmiregistry ");
        direccionIpRMIRegistry = UtilidadesConsola.leerCadena("Ingrese la IP (localhost o otra): ");
        System.out.println("Cual es el nUmero de puerto por el cual escucha el rmiregistry ");
        numPuertoRMIRegistry = UtilidadesConsola.leerEntero();

        objRemoto = (GestionUsuariosInt) UtilidadesRegistroS.obtenerObjRemoto(direccionIpRMIRegistry, numPuertoRMIRegistry,
                "GesUsuario");
        menuSesion();

    }

    private static void menuSesion() throws RemoteException {
        int opcion = 0;
        String password;
        String user;
        int ID;
        Usuario_DTO usuario = null;
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
                    usuario = new Usuario_DTO(ID,"",user,password);
                    if (objRemoto.abrirSesion(usuario)==1) {
                        menuOperador();
                    }
                    else {
                        menuUsuario();
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

    private static void menuOperador() {
        int opcion = 0;
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
                        System.out.println("En construccion");
                        break;
                    case 2:
                        System.out.println("En construccion");
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

    private static void menuUsuario() {
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
                    System.out.println("En construccion");
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

    public static void limpiar() {
        for (int i = 0; i < 20; i++) {
            System.out.println("");
        }
    }
}
