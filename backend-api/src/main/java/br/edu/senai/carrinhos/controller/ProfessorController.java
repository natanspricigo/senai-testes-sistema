package br.edu.senai.carrinhos.controller;

import br.edu.senai.carrinhos.dto.ProfessorDTO;
import br.edu.senai.carrinhos.service.ProfessorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService service;

    @PostMapping
    public ResponseEntity<ProfessorDTO> criar(@Valid @RequestBody ProfessorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> obter(@PathVariable Long id) {
        return ResponseEntity.ok(service.obter(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> atualizar(
        @PathVariable Long id,
        @Valid @RequestBody ProfessorDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<ProfessorDTO> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(service.inativar(id));
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<ProfessorDTO> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(service.ativar(id));
    }
}
