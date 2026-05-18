package br.edu.senai.carrinhos.controller;

import br.edu.senai.carrinhos.dto.CarrinhoDTO;
import br.edu.senai.carrinhos.service.CarrinhoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carrinhos")
@RequiredArgsConstructor
public class CarrinhoController {
    private final CarrinhoService service;

    @PostMapping
    public ResponseEntity<CarrinhoDTO> criar(@Valid @RequestBody CarrinhoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<CarrinhoDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarrinhoDTO> obter(@PathVariable Long id) {
        return ResponseEntity.ok(service.obter(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarrinhoDTO> atualizar(
        @PathVariable Long id,
        @Valid @RequestBody CarrinhoDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<CarrinhoDTO> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(service.inativar(id));
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<CarrinhoDTO> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(service.ativar(id));
    }
}
