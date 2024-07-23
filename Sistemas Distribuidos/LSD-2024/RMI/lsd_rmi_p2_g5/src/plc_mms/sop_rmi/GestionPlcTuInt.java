package plc_mms.sop_rmi;

import plc_mms.dto.DatosPlcTu_DTO;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface GestionPlcTuInt extends Remote  {
    public boolean registrar_plctu(DatosPlcTu_DTO dplctu) throws RemoteException;
    public DatosPlcTu_DTO consultarplctu(int plctuid) throws RemoteException;
}
