package grsaa;

import com.sun.org.apache.bcel.internal.generic.NEW;
import grsaa.sop_corba.GestionDispositivosPackage.*;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO;
import plc_mms.sop_corba.GestionUsuariosPackage.usuarioDTO;

import java.io.*;
import java.rmi.RemoteException;
import java.util.ArrayList;

public class GestionDispositivosImpl extends grsaa.sop_corba.GestionDispositivosPOA{
    private usuarioDTO usuario = new usuarioDTO(1,"Juanito Perez","admin","admin");
    private int sesionOPER;
    private notificacionDTO GestionTU;
    private ArrayList<Factura_DTO> listFacturas = new ArrayList<>();
    int varContador = 0;


    @Override
    public void notificacionmms(notificacionDTO objNotificacion) {
        System.out.println("El dispositivo PLC_MMS con Id:"+ objNotificacion.idPlcmms +" completo sus registros y esta activo en el sistema");
        this.GestionTU = objNotificacion;
    }

    @Override
    public int lectura(Lectura_DTOHolder objLectura) {

        System.out.println("Se esta iniciando la lectura.");
        GestionTU.listTU =  objLectura.value.listTU;
        if(varContador == this.GestionTU.listTU.length)
        {
            objLectura.value.listTU = GestionTU.listTU;
            return 1;
        }
        for (grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO plcTu : this.GestionTU.listTU) {
            if(contarLineas(GestionTU.idPlcmms+"_"+plcTu.id_plctu+".txt")<4) {
                escribirArchivo(GestionTU.idPlcmms, plcTu.id_plctu, plcTu.lectura);
            }
            else
            {
                varContador++;
                System.out.println("Se termino la lectura para este dispositivo: ");
                crearFactura(plcTu,GestionTU.idPlcmms+"_"+plcTu.id_plctu+".txt");

            }
        }
        return 0;
    }



    @Override
    public boolean recuperarFactura(String IdTu, Factura_DTOHolder objFactura) {
        // Verificar si objFactura es nulo
        if (objFactura == null) {
            System.out.println("El parámetro objFactura no puede ser null.");
            return false;
        }

        // Verificar si listFacturas está inicializado y no está vacío
        if (listFacturas == null || listFacturas.isEmpty()) {
            System.out.println("La lista de facturas no está inicializada o está vacía.");
            return false;
        }

        // Buscar la factura por IdTu
        System.out.println("Se está consultando la factura con IdTu: " + IdTu);
        for (Factura_DTO facturaElem : this.listFacturas) {
            if (facturaElem != null && facturaElem.id_plctu != null && facturaElem.id_plctu.equals(IdTu)) {
                objFactura.value = new Factura_DTO(
                        facturaElem.id_plctu,
                        facturaElem.lecturaIni,
                        facturaElem.lecturaFin,
                        facturaElem.consumo
                );
                System.out.println("Factura encontrada.");
                return true;
            }
        }

        // Manejar el caso donde la factura no se encuentra
        System.out.println("Factura no encontrada.");
        return false;
    }


    public void crearFactura(grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO prmTU , String fileName){

        int estrato = Integer.parseInt(prmTU.estrato);
        switch (estrato)
        {
            case 1: prmTU.consumo = calcularConsumo(fileName,0) * 420;
                break;
            case 2: prmTU.consumo = (calcularConsumo(fileName,0) * 525);
                break;
            case 3: prmTU.consumo = (calcularConsumo(fileName,0) * 852);
                break;
            case 4: prmTU.consumo = (calcularConsumo(fileName,0) * 1002);
                break;
            case 5: prmTU.consumo = (calcularConsumo( fileName,0)* 1002);
                break;
            case 6: prmTU.consumo = (calcularConsumo(fileName,0) * 1002);
                break;
        }
        Factura_DTO factura = new Factura_DTO(prmTU.id_plctu,String.valueOf(calcularConsumo(fileName,1)),String.valueOf(calcularConsumo(fileName,2)),prmTU.consumo);

        System.out.println("Se calculo el consumo del TU: " + prmTU.id_plctu +" En un total de: " + prmTU.consumo);
        this.listFacturas.add(factura);
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


    public notificacionDTO getGestionTU() {
        return GestionTU;
    }

    public void setGestionTU(notificacionDTO gestionTU) {
        GestionTU = gestionTU;
    }

    grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO conversoDTO(DatosPlcTu_DTO objMMS , grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO objGestion)
    {
        objGestion.id_plctu = objMMS.id_plctu;
        objGestion.lectura = objMMS.lectura;
        objGestion.propietario = objMMS.propietario;
        objGestion.estrato = objMMS.estrato;
        return objGestion;
    };


}
