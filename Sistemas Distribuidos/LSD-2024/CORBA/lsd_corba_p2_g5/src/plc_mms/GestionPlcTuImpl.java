package plc_mms;

import grsaa.GestionDispositivosImpl;
import grsaa.sop_corba.*;
import grsaa.sop_corba.GestionDispositivosPackage.notificacionDTO;
import org.omg.CosNaming.NamingContext;
import org.omg.CosNaming.NamingContextExt;
import org.omg.CosNaming.NamingContextPackage.CannotProceed;
import org.omg.CosNaming.NamingContextPackage.InvalidName;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO;
import plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTOHolder;
import plc_tu.utilidades.UtilidadesRegistroS;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.Random;

public class GestionPlcTuImpl extends plc_mms.sop_corba.GestionPlcTuPOA {
    private GestionDispositivos refServant2;
    private final ArrayList<DatosPlcTu_DTO> listplcTu = new ArrayList<plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO>();
    private String plcTuId;
    private notificacionDTO notificacion;
    @Override
    public boolean registrar_plctu (plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO dplctu){
        System.out.println("Registrando PLC_TU: " + dplctu.id_plctu);

        if (listplcTu.size() == 1) {
            System.out.println("Se alcanzó el número máximo de PLC TU");
            notificacion = new notificacionDTO(Integer.parseInt(generarNumeroAleatorio()));
            refServant2.notificacionmms(notificacion);
            return false;
        }

        for (plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO plcTu : listplcTu) {
            if (plcTu.id_plctu.equals(dplctu.id_plctu)) {
                System.out.println("Error al registrar: ID Repetido");
                return false;
            }
        }

        listplcTu.add(dplctu);
        System.out.println("Plc Tu registrado, ID( " + dplctu.id_plctu + " )");
        System.out.println("PLC TU Totales: " + listplcTu.size());
        return true;
    }
    @Override
    public boolean consultarplctu (int plctuid, DatosPlcTu_DTOHolder objTU){
        String varId = String.valueOf(plctuid);
        System.out.println("Consultando ID: " + varId);

        for (plc_mms.sop_corba.GestionPlcTuPackage.DatosPlcTu_DTO plcTu : listplcTu) {
            if (plcTu.id_plctu.equals(varId)) {
                System.out.println("Plc Tu encontrado.");
                objTU.value =plcTu;
                return true;
            }
        }
        System.out.println("Plc Tu no encontrado.");
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



    private String generarNumeroAleatorio() {
        // Crear un objeto Random
        Random rand = new Random();

        // Generar un número aleatorio entre 0 y 99
        int numero = rand.nextInt(100);

        // Formatear el número como una cadena de dos dígitos
        String numeroFormateado = String.format("%02d", numero);

        return numeroFormateado;
    }

}

