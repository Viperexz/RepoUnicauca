package plc_mms.dto;

import java.io.Serializable;

public class DatosPlcTu_DTO implements Serializable  {
    String id_plctu;
    String propietario;
    String tipoIden;
    String numIden;
    String direccion;
    String estrato;
    String fechaRegistro;
    int lectura;
    int consumo;

    public DatosPlcTu_DTO(String id_plctu, String propietario, String tipoIden, String numIden, String direccion, String estrato, String fechaRegistro, int lectura, int consumo) {
        this.id_plctu = id_plctu;
        this.propietario = propietario;
        this.tipoIden = tipoIden;
        this.numIden = numIden;
        this.direccion = direccion;
        this.estrato = estrato;
        this.fechaRegistro = fechaRegistro;
        this.lectura = lectura;
        this.consumo = consumo;
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

    public String getTipoIden() {
        return tipoIden;
    }

    public void setTipoIden(String tipoIden) {
        this.tipoIden = tipoIden;
    }

    public String getNumIden() {
        return numIden;
    }

    public void setNumIden(String numIden) {
        this.numIden = numIden;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEstrato() {
        return estrato;
    }

    public void setEstrato(String estrato) {
        this.estrato = estrato;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public int getLectura() {
        return lectura;
    }

    public void setLectura(int lectura) {
        this.lectura = lectura;
    }

    public int getConsumo() {
        return consumo;
    }

    public void setConsumo(int consumo) {
        this.consumo = consumo;
    }
}
