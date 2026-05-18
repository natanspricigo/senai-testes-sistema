package br.edu.senai.carrinhos.service;

import br.edu.senai.carrinhos.dto.ProfessorDTO;
import br.edu.senai.carrinhos.entity.Professor;
import br.edu.senai.carrinhos.exception.BusinessException;
import br.edu.senai.carrinhos.exception.ResourceNotFoundException;
import br.edu.senai.carrinhos.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository repository;

    public ProfessorDTO criar(ProfessorDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Email já cadastrado");
        }
        Professor professor = new Professor();
        professor.setNome(dto.getNome());
        professor.setEmail(dto.getEmail());
        professor.setAtivo(true);
        Professor salvo = repository.save(professor);
        return toDTO(salvo);
    }

    public List<ProfessorDTO> listar() {
        return repository.findAll()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public ProfessorDTO obter(Long id) {
        Professor professor = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        return toDTO(professor);
    }

    public ProfessorDTO atualizar(Long id, ProfessorDTO dto) {
        Professor professor = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        
        if (!professor.getEmail().equals(dto.getEmail()) && 
            repository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Email já cadastrado");
        }
        
        professor.setNome(dto.getNome());
        professor.setEmail(dto.getEmail());
        Professor atualizado = repository.save(professor);
        return toDTO(atualizado);
    }

    public ProfessorDTO inativar(Long id) {
        Professor professor = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        professor.setAtivo(false);
        Professor atualizado = repository.save(professor);
        return toDTO(atualizado);
    }

    public ProfessorDTO ativar(Long id) {
        Professor professor = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        professor.setAtivo(true);
        Professor atualizado = repository.save(professor);
        return toDTO(atualizado);
    }

    private ProfessorDTO toDTO(Professor professor) {
        return new ProfessorDTO(
            professor.getId(),
            professor.getNome(),
            professor.getEmail(),
            professor.getAtivo()
        );
    }
}
