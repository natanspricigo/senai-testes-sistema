package br.edu.senai.carrinhos.repository;

import br.edu.senai.carrinhos.entity.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    boolean existsByNumero(Integer numero);
}
