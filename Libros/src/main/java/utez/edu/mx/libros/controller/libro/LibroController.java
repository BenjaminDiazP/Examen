package utez.edu.mx.libros.controller.libro;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.libros.config.ApiResponse;
import utez.edu.mx.libros.controller.libro.dto.LibroDto;
import utez.edu.mx.libros.model.libro.Libro;
import utez.edu.mx.libros.service.libro.LibroService;

@RestController
@RequestMapping("/api/libro")
public class LibroController {

    private final LibroService libroService;


    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return libroService.getAll();
    }

    @GetMapping("/{folio}")
    private ResponseEntity<ApiResponse> getByFolio(@PathVariable String folio){
        return libroService.getFolio(folio);
    }

    @PostMapping("/")
    private ResponseEntity<ApiResponse> save(@RequestBody  LibroDto dto){
        return libroService.save(dto.toEntity());
    }

    @PutMapping("/")
    private ResponseEntity<ApiResponse> update(@RequestBody LibroDto dto){
        return libroService.update(dto.up());
    }

    @DeleteMapping("/")
    private ResponseEntity<ApiResponse> delete(@RequestBody Long id){
        return libroService.delete(id);
    }

}
