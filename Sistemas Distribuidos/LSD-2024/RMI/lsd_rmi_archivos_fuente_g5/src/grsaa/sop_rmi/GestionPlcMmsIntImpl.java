package grsaa.sop_rmi;

import grsaa.dto.Factura_DTO;
import grsaa.dto.ListTu_DTO;
import grsaa.dto.Usuario_DTO;
import plc_mms.dto.DatosPlcTu_DTO;
import plc_mms.sop_rmi.GestionPlcTuInt;

import java.io.*;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;

public class GestionPlcMmsIntImpl extends UnicastRemoteObject implements GestionPlcMmsInt {
    private Usuario_DTO usuario = new Usuario_DTO(1,"Juanito Perez","admin","admin");
    private int sesionOPER;
    private ListTu_DTO GestionTU;
    private ArrayList<Factura_DTO> listFacturas;
   // private static GestionPlcTuInt objRemoto2;


    public GestionPlcMmsIntImpl(String ip,int puerto) throws RemoteException
    {
        System.out.println("En GestionUsuariosImpl()");
        listFacturas = new ArrayList<>();
       // objRemoto2 = (GestionPlcTuInt) plc_tu.utilidades.UtilidadesRegistroS.obtenerObjRemoto(ip,puerto, "GesPlcMms");
    }

    @Override
    public void notificacionmms(int mmsid,ArrayList<DatosPlcTu_DTO> listTU)throws RemoteException {
        GestionTU = new ListTu_DTO(listTU, mmsid);
        System.out.println("El dispositivo PLC_MMS con Id:"+ mmsid +" Fue registrado y sus PLC_TU Cargados.");
    }


    public int lectura(ArrayList<DatosPlcTu_DTO> listTU) throws RemoteException {
        int varContador = 0;
        System.out.println("Se esta iniciando la lectura.");
        GestionTU.setListTU(listTU);
        if(varContador == GestionTU.getListTU().size()) return 1;
        for (DatosPlcTu_DTO plcTu : GestionTU.getListTU()) {
            if(contarLineas(GestionTU.getMmsId()+"_"+plcTu.getId_plctu()+".txt")<4) {
                escribirArchivo(GestionTU.getMmsId(), plcTu.getId_plctu(), plcTu.getLectura());
            }
            else
            {
                varContador++;
                System.out.println("Se termino la lectura para este dispositivo: ");

                crearFactura(plcTu,GestionTU.getMmsId()+"_"+plcTu.getId_plctu()+".txt");




            }
        }
        return 0;
    }

    public void crearFactura(DatosPlcTu_DTO prmTU ,String fileName) throws RemoteException {

        int estrato = Integer.parseInt(prmTU.getEstrato());
        switch (estrato)
        {
            case 1: prmTU.setConsumo(calcularConsumo(fileName,0) * 420);
                break;
            case 2: prmTU.setConsumo(calcularConsumo(fileName,0) * 525);
                break;
            case 3: prmTU.setConsumo(calcularConsumo(fileName,0) * 852);
                break;
            case 4: prmTU.setConsumo(calcularConsumo(fileName,0) * 1002);
                break;
            case 5: prmTU.setConsumo(calcularConsumo( fileName,0)* 1002);
                break;
            case 6: prmTU.setConsumo(calcularConsumo(fileName,0) * 1002);
                break;
        }
        Factura_DTO factura = new Factura_DTO(String.valueOf(calcularConsumo(fileName,1)),prmTU.getId_plctu(),String.valueOf(calcularConsumo(fileName,2)),prmTU.getConsumo());
        System.out.println("Se calculo el consumo del TU: " + prmTU.getId_plctu() +" En un total de: " + prmTU.getConsumo());
        //objRemoto2.notificarFacturas(String.valueOf(prmTU.getId_plctu()));
        listFacturas.add(factura);
    }


    public Factura_DTO recuperarFactura(String plcID)
    {
        System.out.println("Se esta consultando la factura.");
        for (Factura_DTO facturaElem : listFacturas)
        {
            if(facturaElem.getId_plctu().equals(plcID))
            {
                return facturaElem;
            }
        }
        return null;
    }




    public void escribirArchivo(int mmsid, String plc,int lectura) {


        String fileName =mmsid+"_"+plc+".txt";
        System.out.println("Se esta escribiendo en el archivo: " + fileName + " Lectura: " + lectura);
        String encoding = "UTF-8";
        if(contarLineas(fileName)<4)
        {
            try {
                PrintWriter writer = new PrintWriter(new FileWriter(fileName, true)); // true para agregar al final del archivo
                writer.println(lectura);
                writer.close();
            } catch (IOException e) {
                System.out.println("An error occurred while writing to the file.");
                e.printStackTrace();
            }
        }
        else
        {
            System.out.println("La factura esta disponible");

        }

    }

    public int contarLineas(String fileName) {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            while (reader.readLine() != null) {
                count++;
            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading the file.");
            e.printStackTrace();
        }
        return count;
    }



    //Se fijan 3 modos:
    //Modo 1: Retorna solo la lectura 1:
    //Modo 2: Retorno Solo lectura 2;
    //Modo 0 u otro: retorna el calculo de consumo
    public int calcularConsumo(String fileName , int modo) {
        int varLectura1 = 0, varLectura2 = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            int count = 0;
            while ((line = reader.readLine()) != null) {
                if (count == 0) {
                    varLectura1 = Integer.parseInt(line);
                } else if (count == 3) {
                    varLectura2 = Integer.parseInt(line);
                    break; // Se detiene el bucle después de leer la segunda línea necesaria.
                }
                count++;
            }
            System.out.println("El archivo "+ fileName + " tiene las siguientes siguientes lecturas 1: " + varLectura1 + " 2: " + varLectura2);
            if(modo==1)
            {
                return varLectura1;
            }
            else if (modo ==2)
            {
                return varLectura2;
            }
            else {
                return varLectura2 - varLectura1;
            }
        } catch (IOException e) {
            System.out.println("Ocurrió un error al leer el archivo.");
            e.printStackTrace();
            return 0;
        } catch (NumberFormatException e) {
            System.out.println("El archivo contiene datos no válidos para la lectura.");
            e.printStackTrace();
            return 0;
        }
    }




    public ListTu_DTO getGestionTU() {
        return GestionTU;
    }

    public void setGestionTU(ListTu_DTO gestionTU) {
        GestionTU = gestionTU;
    }
}
