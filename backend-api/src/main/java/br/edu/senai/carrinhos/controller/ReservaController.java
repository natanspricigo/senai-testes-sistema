package br.edu.senai.carrinhos.controller;

import br.edu.senai.carrinhos.dto.ReservaDTO;
import br.edu.senai.carrinhos.service.ReservaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {
    private final ReservaService service;

    @PostMapping
    public ResponseEntity<ReservaDTO> criar(@Valid @RequestBody ReservaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listar(
        @RequestParam(required = false) LocalDate dataUso,
        @RequestParam(required = false) Long professorId,
        @RequestParam(required = false) Long carrinhoId) {
        
        if (dataUso != null) {
            return ResponseEntity.ok(service.buscarPorData(dataUso));
        } else if (professorId != null) {
            return ResponseEntity.ok(service.buscarPorProfessor(professorId));
        } else if (carrinhoId != null) {
            return ResponseEntity.ok(service.buscarPorCarrinho(carrinhoId));
        } else {
            return ResponseEntity.ok(service.listar());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> obter(@PathVariable Long id) {
        return ResponseEntity.ok(service.obter(id));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<ReservaDTO> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelar(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<ReservaDTO> finalizar(@PathVariable Long id) {
        return ResponseEntity.ok(service.finalizar(id));
    }
}
