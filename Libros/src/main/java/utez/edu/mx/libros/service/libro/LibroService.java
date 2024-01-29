package utez.edu.mx.libros.service.libro;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.libros.config.ApiResponse;
import utez.edu.mx.libros.model.libro.Libro;
import utez.edu.mx.libros.model.libro.LibroRepository;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class LibroService {

    private final LibroRepository libroRepository;


    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }


    //GET

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
            return  new ResponseEntity<>(new ApiResponse(libroRepository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }


    //GET por folio
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getFolio(String folio){
        Optional<Libro> libroOptional = libroRepository.findByFolio(folio);
        if(libroOptional.isPresent()){
            return new ResponseEntity<>(new ApiResponse(libroOptional.get(), HttpStatus.OK), HttpStatus.OK);
        }else {
           return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Libro not found"), HttpStatus.NOT_FOUND);
        }
    }


    //POST
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(Libro libro) {

        //Aqui debo de agregarle el metodo para crear el folio
        Libro object = new Libro();
        libro.setFolio(object.generarFolio(libro.getNombre(),libro.getAutor(),libro.getFechaPublicacion(),libro.getIsbn()));

        Optional<Libro> foundLibro = libroRepository.findByFolio(libro.getFolio());
        if(foundLibro.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "RecordAlreadyExist"), HttpStatus.OK);
        }else{

            libro = libroRepository.saveAndFlush(libro);
        }
        return new ResponseEntity<>(new ApiResponse(libro, HttpStatus.OK), HttpStatus.OK);
    }



    //PUT
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(Libro libro) {

        Optional<Libro> foundLibro = libroRepository.findById(libro.getId());
        if (foundLibro.isEmpty())
            return new ResponseEntity<>(
                    new ApiResponse(HttpStatus.NOT_FOUND, true, "NoDataFound"),
                    HttpStatus.NOT_FOUND
            );

        //Aqui debo de meter la logica para crear el folio
        Libro object = new Libro();
        libro.setFolio(object.generarFolio(libro.getNombre(),libro.getAutor(),libro.getFechaPublicacion(),libro.getIsbn()));
        Optional<Libro> foundFolio = libroRepository.findByFolio(libro.getFolio());
        if(foundFolio.isEmpty()) {
            return new ResponseEntity<>(
                    new ApiResponse(HttpStatus.BAD_REQUEST, true, "RecordAlreadyExist"),
                    HttpStatus.BAD_REQUEST
            );
        }
        libro = libroRepository.saveAndFlush(libro);
        return new ResponseEntity<>(new ApiResponse(libro, HttpStatus.OK), HttpStatus.OK);

    }


    //DELETE
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete(Long id){
        Optional<Libro> foundLibro = libroRepository.findById(id);
        if(foundLibro.isPresent()){
            libroRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse("Person delet successfully", HttpStatus.OK), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "NoDataFound"), HttpStatus.NOT_FOUND);
    }


}
