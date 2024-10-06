package org.osfehoyos.backend.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.osfehoyos.backend.repositorio.*;
import org.osfehoyos.backend.modelo.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Add this line
public class productoController {

    @Autowired
    private productoRepository productoRepository;

    @PostMapping("/registro")
    public boolean insertarProducto(@RequestBody producto prmProducto){
        try {
            productoRepository.save(prmProducto);
            return true;
        }catch (Exception e) {
            System.out.println("Error al insertar producto: " + e.getMessage());
            return false;
        }
    }
    @PostMapping("/{codigo}")
    public producto modificarProducto(@PathVariable int codigo, @RequestBody producto productoActualizado) {
        return productoRepository.findById(codigo)
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setPrecio(productoActualizado.getPrecio().doubleValue());
                    return productoRepository.save(producto);
                })
                .orElseGet(() -> {
                    productoActualizado.setCodigo(codigo);
                    return productoRepository.save(productoActualizado);
                });
    }
    @DeleteMapping("/eliminar")
    public void eliminarProducto(@RequestBody producto prmCodigo){
        productoRepository.delete(prmCodigo);
    }
    @PostMapping("/buscar")
    public ResponseEntity<producto> buscarProducto(@RequestBody int codigo){
        try {
            producto producto = productoRepository.findByCodigo(codigo);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            System.out.println("Error al buscar producto: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar")
    public List<producto> listarProductos(){
        return (List<producto>) productoRepository.findAll();
    }
}