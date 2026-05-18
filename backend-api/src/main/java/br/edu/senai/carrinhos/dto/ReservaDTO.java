package br.edu.senai.carrinhos.dto;

import br.edu.senai.carrinhos.entity.StatusReserva;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaDTO {
    private Long id;

    @NotNull(message = "ID do professor é obrigatório")
    private Long professorId;

    @NotNull(message = "ID do carrinho é obrigatório")
    private Long carrinhoId;

    @NotNull(message = "Data de uso é obrigatória")
    private LocalDate dataUso;

    @NotNull(message = "Hora de início é obrigatória")
    private LocalTime horaInicio;

    @NotNull(message = "Hora de fim é obrigatória")
    private LocalTime horaFim;

    @NotBlank(message = "Turma é obrigatória")
    private String turma;

    private String observacao;

    private StatusReserva status;

    // DTOs para resposta completa
    private ProfessorDTO professor;
    private CarrinhoDTO carrinho;
}
