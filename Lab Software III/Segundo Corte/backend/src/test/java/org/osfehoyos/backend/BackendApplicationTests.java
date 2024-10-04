package org.osfehoyos.backend;

import org.osfehoyos.backend.modelo.producto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private org.osfehoyos.backend.controlador.productoController productoController;

    @Test
    void ConsultaProducto() {
        int varCodigo = 1;
        producto resultado = productoController.buscarProducto(varCodigo).getBody();
        assert resultado != null;
        System.out.println("Producto encontrado: " + resultado.getNombre());
        assert resultado.getNombre().equals("aceite");
    }

    @Test
    void EliminarProducto() {
        int varCodigo = 1;
        producto resultado = productoController.buscarProducto(varCodigo).getBody();
        assert resultado != null;
        System.out.println("Producto encontrado: " + resultado.getNombre());
        assert resultado.getNombre().equals("aceite");
        productoController.eliminarProducto(resultado);
        producto resultadoEliminado = productoController.buscarProducto(varCodigo).getBody();
        assert resultadoEliminado == null;
        System.out.println("Producto eliminado: " + resultado.getNombre());
    }

    @Test
    void CrearProducto() {
        producto nuevoProducto = new producto();
        nuevoProducto.setCodigo(1);
        nuevoProducto.setNombre("aceite");
        nuevoProducto.setPrecio(2.5);
        productoController.insertarProducto(nuevoProducto);
        producto resultado = productoController.buscarProducto(1).getBody();
        assert resultado != null;
        System.out.println("Producto creado: " + resultado.getNombre());
        assert resultado.getNombre().equals("aceite");
    }

    @Test
    void ModificarProducto() {
        int varCodigo = 1;
        producto resultado = productoController.buscarProducto(varCodigo).getBody();
        assert resultado != null;
        System.out.println("Producto encontrado: " + resultado.getNombre());
        assert resultado.getNombre().equals("aceite");
        resultado.setNombre("aceite de oliva");
        productoController.modificarProducto(varCodigo, resultado);
        producto resultadoModificado = productoController.buscarProducto(varCodigo).getBody();
        assert resultadoModificado != null;
        System.out.println("Producto modificado: " + resultadoModificado.getNombre());
        assert resultadoModificado.getNombre().equals("aceite de oliva");
    }

}
