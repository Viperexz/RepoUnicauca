package plc_mms.sop_rmi;

import grsaa.dto.Factura_DTO;
import grsaa.sop_rmi.GestionPlcMmsInt;
import plc_mms.dto.DatosPlcTu_DTO;
import plc_tu.sop_rmi.UsuarioCllbckImpl;
import plc_tu.sop_rmi.UsuarioCllbckInt;
import plc_tu.utilidades.UtilidadesRegistroS;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.Random;

public class GestionPlcTuImpl extends UnicastRemoteObject implements GestionPlcTuInt {

    private final ArrayList<DatosPlcTu_DTO> listplcTu = new ArrayList<>();
    private ArrayList<UsuarioCllbckInt> TuOperConectados = new ArrayList<>();
    private ArrayList<UsuarioCllbckInt> TuClienteContectados = new ArrayList<>();
    private static GestionPlcMmsInt objRemoto;
    private final int plcTuId;
    private boolean running = true;

    public GestionPlcTuImpl(String ip, int puerto) throws RemoteException {

        System.out.println("En GestionPlcTuImpl()");
        plcTuId = generarNumeroAleatorio();
        System.out.println("El PLC Tu ID: " + plcTuId);
        objRemoto = (GestionPlcMmsInt) UtilidadesRegistroS.obtenerObjRemoto(ip, puerto, "GesPlcMms");

    }

    @Override
    public boolean registrar_plctu(DatosPlcTu_DTO dplctu) throws RemoteException {
        // Generar un ID aleatorio para el PLC TU
        dplctu.setId_plctu(String.format("%d", generarNumeroAleatorio()));
        System.out.println("Registrando PLC_TU: " + dplctu.getId_plctu());

        final int MAX_PLCTU = 2;

        // Comprobar si se alcanzó el número máximo de PLC TU
        if (listplcTu.size() >= MAX_PLCTU) {
            System.out.println("Se alcanzó el número máximo de PLC TU");
            notificarMaximoAlcanzado();
            return false;
        }

        // Comprobar si el PLC TU ya está registrado
        if (plcTuRepetido(dplctu)) {
            System.out.println("Error al registrar: ID Repetido");
            return false;
        }

        listplcTu.add(dplctu);
        System.out.println("PLC TU registrado, ID( " + dplctu.getId_plctu() + " )");
        System.out.println("PLC TU Totales: " + listplcTu.size());
        return true;
    }


    @Override
    public synchronized boolean eliminarTU(String idTu) throws RemoteException {
        // Itera a través de los elementos del ArrayList
        for (DatosPlcTu_DTO plctu : listplcTu) {
            if (plctu.getId_plctu().equals(idTu)) {
                // Si el id coincide, elimina el elemento
                listplcTu.remove(plctu);
                return true;
            }
        }
        return false;
    }

    // Método para comprobar si el PLC TU ya está registrado
    private boolean plcTuRepetido(DatosPlcTu_DTO plcTu) {
        for (DatosPlcTu_DTO existingPlcTu : listplcTu) {
            if (existingPlcTu.getId_plctu().equals(plcTu.getId_plctu())) {
                return true;
            }
        }
        return false;
    }

    private void notificarMaximoAlcanzado() throws RemoteException {
        objRemoto.notificacionmms(plcTuId, listplcTu);
        startConsumoAleatorio();
        iniciarLecturaPeriodica();
    }


    @Override
    public DatosPlcTu_DTO consultarplctu(int plctuid) throws RemoteException {
        String varId = String.valueOf(plctuid);
        System.out.println("Consultando ID: " + varId);

        for (DatosPlcTu_DTO plcTu : listplcTu) {
            if (plcTu.getId_plctu().equals(varId)) {
                System.out.println("Plc Tu encontrado.");
                for(UsuarioCllbckInt Oper : TuOperConectados) {
                       Oper.notificar(plcTu.getPropietario(),plcTu.getId_plctu(),1);
                }
                return plcTu;
            }
        }

        System.out.println("Plc Tu no encontrado.");
        return null;
    }

    @Override
    public boolean registrarOperador(UsuarioCllbckInt usuario) throws RemoteException {
        System.out.println("Se registro al operador.");
         TuOperConectados.add( usuario);
        return true;
    }

    @Override
    public boolean usuariosConectados(UsuarioCllbckInt usuario) throws RemoteException {
        System.out.println("Se registro al operador.");
        TuClienteContectados.add(usuario);
        return true;
    }

    @Override
    public Factura_DTO recuperarFactura(String IdTu) throws RemoteException {
        return objRemoto.recuperarFactura(IdTu);
    }

    @Override
    public void notificarFacturas(String IdTu) throws RemoteException {
        for (UsuarioCllbckInt Usuario : TuClienteContectados) {
            Usuario.notificar("",IdTu,2);
        }
    }





    private int generarNumeroAleatorio() {
        Random rand = new Random();
        return rand.nextInt(100);
    }

    public ArrayList<DatosPlcTu_DTO> recuperarLista() throws RemoteException
    {
        if(!listplcTu.isEmpty())
        {
            System.out.println("Se envio la lista.");
            return listplcTu;
        }
        else
        {
            return null;
        }
    }

    public synchronized void actualizarLista(ArrayList<DatosPlcTu_DTO> prmListaTU) throws RemoteException {
        if (!prmListaTU.isEmpty()) {
            System.out.println("Se actualizó la lista");
            listplcTu.clear();
            listplcTu.addAll(prmListaTU);
        }
    }

    private synchronized void iniciarLecturaPeriodica() {
        Thread thread = new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(10000);
                    if (objRemoto.lectura(listplcTu) == 1) break;
                } catch (InterruptedException | RemoteException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    }

    public synchronized void startConsumoAleatorio() {
        Thread thread = new Thread(() -> {
            while (running) {
                consumoAleatorio();
            }
        });
        thread.start();
    }

    public synchronized void stopConsumoAleatorio() {
        running = false;
    }

    private synchronized void consumoAleatorio() {
        Random rand = new Random();
        int maxNumero = 10;
        while (running) {
            if (!listplcTu.isEmpty()) {
                try {
                    int indiceAleatorio = rand.nextInt(listplcTu.size());
                    DatosPlcTu_DTO plcTuAleatorio = listplcTu.get(indiceAleatorio);
                    int numero = rand.nextInt(maxNumero);
                    plcTuAleatorio.setLectura(plcTuAleatorio.getLectura() + numero);
                    System.out.println("El ID:" + plcTuAleatorio.getId_plctu() + " registra una lectura de: " + plcTuAleatorio.getLectura());
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }


}

