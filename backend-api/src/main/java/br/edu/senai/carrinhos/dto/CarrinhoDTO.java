package br.edu.senai.carrinhos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarrinhoDTO {
    private Long id;

    @NotNull(message = "Número é obrigatório")
    @Positive(message = "Número deve ser positivo")
    private Integer numero;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "Quantidade de notebooks é obrigatória")
    @Positive(message = "Quantidade de notebooks deve ser maior que zero")
    private Integer quantidadeNotebooks;

    @NotBlank(message = "Localização é obrigatória")
    private String localizacao;

    private Boolean ativo;
}
