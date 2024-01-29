package utez.edu.mx.libros.model.libro;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Random;

@Entity
@Table(name = "Libros")
@NoArgsConstructor
@Getter
@Setter
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80 , nullable = false)
    private String folio;

    @Column(length = 40, nullable = false)
    private String nombre;

    @Column(length = 40, nullable = false)
    private String isbn;

    @Column(length = 40, nullable = false)
    private String autor;

    @Column(nullable = false)
    private int paginas;

    @Column(length = 40, nullable = false)
    private  String categoria;

    @Column(columnDefinition = "DATE", nullable = false)
    private String fechaPublicacion;


    public Libro(String folio, String nombre, String isbn, String autor, int paginas, String categoria, String fechaPublicacion) {
        this.folio = folio;
        this.nombre = nombre;
        this.isbn = isbn;
        this.autor = autor;
        this.paginas = paginas;
        this.categoria = categoria;
        this.fechaPublicacion = fechaPublicacion;
    }

    public Libro(Long id, String folio, String nombre, String isbn, String autor, int paginas, String categoria, String fechaPublicacion) {
        this.id = id;
        this.folio = folio;
        this.nombre = nombre;
        this.isbn = isbn;
        this.autor = autor;
        this.paginas = paginas;
        this.categoria = categoria;
        this.fechaPublicacion = fechaPublicacion;
    }


    public String generarFolio(String titulo, String autor, String fecha, String isbn){



        String primeraletradeltitulo = titulo.substring(0,1);
        String primeroletradelnombredelautor = autor.substring(0,1);

        String[] nomnbreseparado = autor.split(" ");

        String apellido = nomnbreseparado[0];

        String primerasdosletrasdelapellido =  apellido.substring(0,1);

        String cuatroletrasdelisbn = isbn.substring(0,3);

        Random num = new Random();
        int numerorandom = num.nextInt(100) + 1;

        String letras = "ACBGUIOPLKJMNQWEDSA";

        int numerorandom2 = num.nextInt(19) + 1;

        String letrasaleatorias = letras.substring(numerorandom2);

        String[]  fechaseparada = fecha.split("-");

        String anio = fechaseparada[0];

        String mes = fechaseparada[1];

        String dia = fechaseparada[2];



        String Folio = primeraletradeltitulo + primeroletradelnombredelautor + primerasdosletrasdelapellido + anio + mes + dia + cuatroletrasdelisbn + numerorandom + letrasaleatorias;



        return Folio;
    }

}
