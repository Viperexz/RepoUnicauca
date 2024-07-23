package plc_mms;

import grsaa.sop_corba.*;
import grsaa.sop_corba.GestionDispositivosPackage.Lectura_DTO;
import grsaa.sop_corba.GestionDispositivosPackage.Lectura_DTOHelper;
import grsaa.sop_corba.GestionDispositivosPackage.Lectura_DTOHolder;
import grsaa.sop_corba.GestionDispositivosPackage.notificacionDTO;
import org.omg.CosNaming.NamingContextExt;
import org.omg.CosNaming.NamingContextPackage.CannotProceed;
import org.omg.CosNaming.NamingContextPackage.InvalidName;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import plc_mms.sop_corba.GestionPlcTuPackage.*;
import plc_tu.sop_corba.GestionAlertas;
import plc_tu.sop_corba.GestionAlertasPackage.alertaDto;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class GestionPlcTuImpl extends plc_mms.sop_corba.GestionPlcTuPOA {
    private GestionDispositivos refServant2;
    private ArrayList<DatosPlcTu_DTO> listplcTu = new ArrayList<DatosPlcTu_DTO>();
    private String plcTuId;
    private  notificacionDTO notificacion;
    private boolean running = true;
    private final ArrayList<plc_tu.sop_corba.GestionAlertas> TuOperConectados =  new ArrayList<plc_tu.sop_corba.GestionAlertas>() ;
    private final ArrayList<plc_tu.sop_corba.GestionAlertas> UsuarioCOnectado =  new ArrayList<plc_tu.sop_corba.GestionAlertas>() ;

    @Override
    public boolean registrar_plctu (DatosPlcTu_DTO dplctu){
        dplctu.id_plctu = String.valueOf(generarNumeroAleatorio());
        System.out.println("Registrando PLC_TU: " + dplctu.id_plctu);
        //Dummy:
        /*DatosPlcTu_DTO dummy = new DatosPlcTu_DTO();
        dummy.id_plctu = String.valueOf(generarNumeroAleatorio());
        dummy.propietario = "Juan";
        dummy.tipoIden = "CC";
        dummy.numIden = "123456789";
        dummy.direccion = "Calle 123";
        dummy.estrato = "3";
        dummy.fechaRegistro = "2021-10-10";
        dummy.consumo = 0;
        dummy.lectura = 0;
        this.listplcTu.add(dummy);*/
        if (this.listplcTu.size() >= 2) {
            System.out.println("Se alcanzó el número máximo de PLC TU");

            notificacion = new notificacionDTO();
            notificacion.idPlcmms = generarNumeroAleatorio();
            notificacion.listTU = conversoDTO(this.listplcTu).toArray(new grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO[0]);
            this.refServant2.notificacionmms(notificacion);
            startConsumoAleatorio();
            iniciarLecturaPeriodica();
            return false;
        }
        if(!this.listplcTu.isEmpty()){
            for (DatosPlcTu_DTO plcTu : this.listplcTu) {
                if (plcTu.id_plctu.equals(dplctu.id_plctu)) {
                    System.out.println("Error al registrar: ID Repetido");
                    return false;
                }
            }
        }



        this.listplcTu.add(dplctu);
        System.out.println("Plc Tu registrado, ID( " + dplctu.id_plctu + " )");
        System.out.println("PLC TU Totales: " + listplcTu.size());
        return true;
    }
    @Override
    public boolean consultarplctu (int plctuid, DatosPlcTu_DTOHolder objTU){
        String varId = String.valueOf(plctuid);
        System.out.println("Consultando ID: " + varId);

        for (DatosPlcTu_DTO plcTu : listplcTu) {
            if (plcTu.id_plctu.equals(varId)) {
                System.out.println("Plc Tu encontrado.");
                objTU.value =plcTu;
                try
                {
                    alertaDto objAlerta = new alertaDto(plcTu.propietario,Integer.parseInt(plcTu.id_plctu),1);
                    System.out.println("Se crea la Alerta DTO");
                    for(plc_tu.sop_corba.GestionAlertas TuOperConectado : TuOperConectados)
                    {
                        System.out.println("Se notifico al operador");
                        TuOperConectado.notificar(objAlerta);
                    }
                }
                catch (Exception e)
                {
                    System.out.println("Los operadores no estan diponibles o se desconectaron.");
                }
                return true;
            }
        }
        System.out.println("Plc Tu no encontrado.");
        return false;
    }
    @Override
    public void registrarCallback(plc_tu.sop_corba.GestionAlertas objAlertas) {
        TuOperConectados.add(objAlertas);
        System.out.println("Se registro un operador.");
    }

    @Override
    public void usuariosConectados(plc_tu.sop_corba.GestionAlertas objUsuario) {
        UsuarioCOnectado.add(objUsuario);
        System.out.println("Se registro un operador.");
    }

    @Override
    public boolean recuperarLista(ListaDtoHolder objLista) {
        if (this.listplcTu != null && !this.listplcTu.isEmpty()) {
            if (objLista == null) {
                System.out.println("El parámetro objLista no puede ser null.");
                return false;
            }

            // Asegúrate de que objLista.value esté inicializado
            if (objLista.value == null) {
                objLista.value = new ListaDto();
            }

            objLista.value.listTU = this.listplcTu.toArray(new DatosPlcTu_DTO[0]);
            System.out.println("Se envió la lista.");
            return true;
        } else {
            System.out.println("La lista listplcTu está vacía o no inicializada.");
            return false;
        }
    }


    @Override
    public boolean recuperarFactura(String IdTu, Factura_DTOHolder objFactura) {
        if (objFactura == null) {
            System.out.println("El parámetro objFactura no puede ser null.");
            return false;
        }

        grsaa.sop_corba.GestionDispositivosPackage.Factura_DTOHolder auxFactura = new grsaa.sop_corba.GestionDispositivosPackage.Factura_DTOHolder();
        auxFactura.value = new grsaa.sop_corba.GestionDispositivosPackage.Factura_DTO();
        System.out.println("Se está consultando la factura.");
        boolean result = refServant2.recuperarFactura(IdTu, auxFactura);

        if (result && auxFactura.value != null) {
            objFactura.value = new Factura_DTO(
                    auxFactura.value.id_plctu,
                    auxFactura.value.lecturaIni,
                    auxFactura.value.lecturaFin,
                    auxFactura.value.consumo
            );
            actualizarConsumo(IdTu, auxFactura.value.consumo);
            System.out.println("Factura encontrada y asignada.");
            return true;
        } else {
            System.out.println("Factura no encontrada o es nula.");
            return false;
        }
    }


    @Override
    public void notificarFacturas(String IdTu) {
        try{
            for (GestionAlertas Usuario : UsuarioCOnectado) {
                alertaDto objAlerta = new alertaDto("",Integer.parseInt(IdTu),2);
                Usuario.notificar(objAlerta);
            }
        }catch (Exception e)
        {
            System.out.println("Los usuarios se desconectaron o no estan disponibles");
        }
    }


    @Override
    public synchronized void actualizarLista(ListaDto objLista) {
        if (objLista.listTU.length == 0) {
            System.out.println("Se actualizó la lista");
            listplcTu.clear();
            listplcTu.addAll(Arrays.asList(objLista.listTU));
        }
    }
    @Override
    public boolean eliminarTU(String idTu) {
        return false;
    }


    public void consultarReferenciaRemota(NamingContextExt nce, String servicio)
    {
        try {
            this.refServant2 = GestionDispositivosHelper.narrow(nce.resolve_str(servicio));
            System.out.println("Obtenido el servidor 2" + refServant2 );
        } catch (InvalidName e) {
            throw new RuntimeException(e);
        } catch (CannotProceed e) {
            throw new RuntimeException(e);
        } catch (NotFound e) {
            throw new RuntimeException(e);
        }
    }

    public void actualizarConsumo(String idTu, int consumo) {
        for (DatosPlcTu_DTO plcTu : listplcTu) {
            if (plcTu.id_plctu.equals(idTu)) {
                plcTu.consumo = consumo;
                System.out.println("Se actualizó el consumo del PLC TU: " + idTu);
                break;
            }
        }
    }

    private int generarNumeroAleatorio() {
        Random rand = new Random();
        return rand.nextInt(100);
    }

    private synchronized void iniciarLecturaPeriodica() {
        Lectura_DTOHolder lecturaDto = new Lectura_DTOHolder();
        lecturaDto.value = new Lectura_DTO();

        Thread thread = new Thread(() -> {
            while (true) {
                try {
                    lecturaDto.value.listTU = conversoDTO(this.listplcTu).toArray(new grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO[0]);
                    Thread.sleep(1000);
                    if (refServant2.lectura(lecturaDto) == 1) {
                        System.out.println("Se terminó la lectura.");
                        grsaa.sop_corba.GestionDispositivosPackage.Factura_DTOHolder auxFactura = new grsaa.sop_corba.GestionDispositivosPackage.Factura_DTOHolder();

                        for(DatosPlcTu_DTO tu : listplcTu)
                        {
                            auxFactura.value = new grsaa.sop_corba.GestionDispositivosPackage.Factura_DTO();
                            refServant2.recuperarFactura(tu.id_plctu, auxFactura);
                            actualizarConsumo(tu.id_plctu, auxFactura.value.consumo);
                            notificarFacturas(tu.id_plctu);
                        }

                        System.out.println("Se entergaron los valores de consumo y lectura.");
                        stopConsumoAleatorio();
                        break;
                    }
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
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
                    plcTuAleatorio.lectura = (plcTuAleatorio.lectura + numero);
                    System.out.println("El ID:" + plcTuAleatorio.id_plctu + " registra una lectura de: " + plcTuAleatorio.lectura);
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public notificacionDTO getGestionTU() {
        return notificacion;
    }

    public static ArrayList<grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO> conversoDTO(
            ArrayList<DatosPlcTu_DTO> listMMS) {

        ArrayList<grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO> listGRSAA = new ArrayList<>();

        for (DatosPlcTu_DTO objMMS : listMMS) {
            grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO objGestion =  new grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO();

            objGestion.id_plctu = objMMS.id_plctu;
            objGestion.propietario = objMMS.propietario;
            objGestion.tipoIden = objMMS.tipoIden;
            objGestion.numIden = objMMS.numIden;
            objGestion.direccion = objMMS.direccion;
            objGestion.estrato = objMMS.estrato;
            objGestion.fechaRegistro = objMMS.fechaRegistro;
            objGestion.lectura = objMMS.lectura;
            objGestion.consumo = objMMS.consumo;
            listGRSAA.add(objGestion);
        }
        return listGRSAA;
    }

 public static ArrayList<DatosPlcTu_DTO> conversoDTO2(
                ArrayList<grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO> listGRSAA) {

            ArrayList<DatosPlcTu_DTO> listMMS = new ArrayList<>();

            for (grsaa.sop_corba.GestionDispositivosPackage.DatosPlcTu_DTO objMMS : listGRSAA) {
                 DatosPlcTu_DTO objGestion = new DatosPlcTu_DTO();
                objGestion.id_plctu = objMMS.id_plctu;
                objGestion.propietario = objMMS.propietario;
                objGestion.tipoIden = objMMS.tipoIden;
                objGestion.numIden = objMMS.numIden;
                objGestion.direccion = objMMS.direccion;
                objGestion.estrato = objMMS.estrato;
                objGestion.fechaRegistro = objMMS.fechaRegistro;
                objGestion.lectura = objMMS.lectura;
                objGestion.consumo = objMMS.consumo;
                listMMS.add(objGestion);
            }



            return listMMS;
    }
}


