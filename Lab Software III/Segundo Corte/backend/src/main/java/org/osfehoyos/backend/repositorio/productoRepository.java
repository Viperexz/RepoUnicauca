package org.osfehoyos.backend.repositorio;

import org.osfehoyos.backend.modelo.producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productoRepository extends JpaRepository<producto, Integer> {
    producto findByCodigo(int codigo);
}
