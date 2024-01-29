package utez.edu.mx.libros.controller.libro.dto;


import lombok.Getter;
import lombok.Setter;
import utez.edu.mx.libros.model.libro.Libro;

@Getter
@Setter
public class LibroDto {


    private Long id;
    private String folio;
    private String nombre;
    private String isbn;
    private String autor;
    private int paginas;
    private  String categoria;
    private String fechaPublicacion;


    public Libro toEntity(){
        return new Libro(folio,nombre,isbn,autor,paginas,categoria,fechaPublicacion);
    }

    public Libro up(){
        return new Libro(id,folio,nombre,isbn,autor,paginas,categoria,fechaPublicacion);
    }





}
