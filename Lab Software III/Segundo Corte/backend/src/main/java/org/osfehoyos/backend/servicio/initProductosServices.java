package org.osfehoyos.backend.servicio;

import org.osfehoyos.backend.repositorio.*;
import jakarta.annotation.PostConstruct;
import org.osfehoyos.backend.modelo.producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class initProductosServices {

    @Autowired
    private final productoRepository productoRepository;

    public initProductosServices(org.osfehoyos.backend.repositorio.productoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @PostConstruct
    public void init(){
        producto producto1 = new producto();
        producto1.setCodigo(1);
        producto1.setNombre("aceite");
        producto1.setPrecio(1800.78);
        productoRepository.save(producto1);

        producto producto2 = new producto();
        producto2.setCodigo(2);
        producto2.setNombre("pasta");
        producto2.setPrecio(3570.52);
        productoRepository.save(producto2);
    }
}
