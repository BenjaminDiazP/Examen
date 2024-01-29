package utez.edu.mx.libros.model.libro;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LibroRepository extends JpaRepository<Libro,Long > {

    Optional<Libro> findById (Long id);

    Optional<Libro> findByFolio(String folio);
}
