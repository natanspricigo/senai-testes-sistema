package br.edu.senai.carrinhos.repository;

import br.edu.senai.carrinhos.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByEmail(String email);
    Professor findByEmail(String email);
}
