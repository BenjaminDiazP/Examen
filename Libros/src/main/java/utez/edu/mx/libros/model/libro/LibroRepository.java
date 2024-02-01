package utez.edu.mx.libros.model.libro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // me falto poner la etiqueta repositorio
public interface LibroRepository extends JpaRepository<Libro,Long > {

    Optional<Libro> findById (Long id);

    Optional<Libro> findByFolio(String folio);
}
