
package plc_tu.utilidades;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class UtilidadesRegistroS {
    public static void arrancarNS(int numPuertoNS) throws RemoteException {
        try {

            Registry registro = LocateRegistry.getRegistry(numPuertoNS);
            String[] vector = registro.list();
            System.out.println("nombres de objetos remotos registrados ");
            for (String IDObjetoRemoto : vector) {
                System.out.println("nombre : " + IDObjetoRemoto);
            }
            System.out.println("El rmiRegistry se ha obtenido y se encuentra escuchando en el puerto: " + numPuertoNS);

        } catch (RemoteException e) {
            System.out.println("El rmiRegistry no se localizó en el puerto: " + numPuertoNS);

            Registry registro = LocateRegistry.createRegistry(numPuertoNS);
            System.out.println("El registro se ha creado en el puerto: " + numPuertoNS);
        }

    }

    public static Remote obtenerObjRemoto(String dirIPNS, int puertoNS, String identificadorObjetoRemoto) throws RemoteException {
        Remote objetoObtenido = null;
        int numIntentos = 10 , tiempoEspera = 2000 ;

        String URLRegistro = "rmi://" + dirIPNS + ":" + puertoNS + "/" + identificadorObjetoRemoto;
        int intentosRealizados = 0;
        while (intentosRealizados < numIntentos) {
            try {
                objetoObtenido = Naming.lookup(URLRegistro);
                break; // Si la búsqueda tiene éxito, salimos del bucle
            } catch (NotBoundException e) {
                System.out.println("Error, objeto remoto no localizado: " + e.getMessage());
            } catch (MalformedURLException e) {
                System.out.println("Error, URL inválida: " + e.getMessage());
                break; // Si la URL es inválida, no tiene sentido seguir intentando
            } catch (RemoteException e) {
                System.out.println("Excepción en obtención del objeto remoto: " + e.getMessage());
            }

            // Esperar un tiempo antes de volver a intentar
            try {
                Thread.sleep(tiempoEspera);
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
            }

            intentosRealizados++;
        }

        if (objetoObtenido == null) {
            System.out.println("No se pudo obtener el objeto remoto después de " + numIntentos + " intentos.");
        }

        return objetoObtenido;
    }

}
