package br.edu.senai.carrinhos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "carrinhos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer numero;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Integer quantidadeNotebooks;

    @Column(nullable = false)
    private String localizacao;

    @Column(nullable = false)
    private Boolean ativo = true;
}
