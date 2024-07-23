package plc_tu.sop_rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface UsuarioCllbckInt extends Remote
{
    public void notificar(String usuario, String id,int modo) throws RemoteException;

}

