package grsaa.dto;

import java.io.Serializable;

public class Factura_DTO implements Serializable {
    String id_plctu;
    String lecturaIni;
    String lecturaFin;
    int consumo;

    public Factura_DTO(String lecturaIni, String id_plctu, String lecturaFin, int consumo) {
        this.lecturaIni = lecturaIni;
        this.id_plctu = id_plctu;
        this.lecturaFin = lecturaFin;
        this.consumo = consumo;
    }

    public int getConsumo() {
        return consumo;
    }

    public void setConsumo(int consumo) {
        this.consumo = consumo;
    }

    public String getLecturaFin() {
        return lecturaFin;
    }

    public void setLecturaFin(String lecturaFin) {
        this.lecturaFin = lecturaFin;
    }

    public String getId_plctu() {
        return id_plctu;
    }

    public void setId_plctu(String id_plctu) {
        this.id_plctu = id_plctu;
    }

    public String getLecturaIni() {
        return lecturaIni;
    }

    public void setLecturaIni(String lecturaIni) {
        this.lecturaIni = lecturaIni;
    }
}
