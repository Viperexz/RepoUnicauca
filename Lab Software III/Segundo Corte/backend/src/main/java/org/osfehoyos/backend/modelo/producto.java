package org.osfehoyos.backend.modelo;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
public class producto {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 11)
    int codigo;
    @Column(length = 120)
    String nombre;
    @Column(precision = 6, scale = 2)
    BigDecimal precio;


    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = BigDecimal.valueOf(precio);
    }
}