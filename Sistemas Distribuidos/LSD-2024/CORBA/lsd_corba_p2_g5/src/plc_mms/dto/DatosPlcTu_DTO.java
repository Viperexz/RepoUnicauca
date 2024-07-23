package plc_mms.dto;

import java.io.Serializable;

public class DatosPlcTu_DTO implements Serializable  {
    String id_plctu;
    String propietario;
    String direccion;
    int consumo;

    public DatosPlcTu_DTO(int consumo, String direccion, String propietario, String id_plctu) {
        this.consumo = consumo;
        this.direccion = direccion;
        this.propietario = propietario;
        this.id_plctu = id_plctu;
    }

    public String getId_plctu() {
        return id_plctu;
    }

    public void setId_plctu(String id_plctu) {
        this.id_plctu = id_plctu;
    }

    public String getPropietario() {
        return propietario;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getConsumo() {
        return consumo;
    }

    public void setConsumo(int consumo) {
        this.consumo = consumo;
    }
}
