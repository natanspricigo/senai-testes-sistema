package br.edu.senai.carrinhos.repository;

import br.edu.senai.carrinhos.entity.Reserva;
import br.edu.senai.carrinhos.entity.StatusReserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByDataUso(LocalDate dataUso);
    List<Reserva> findByProfessorId(Long professorId);
    List<Reserva> findByCarrinhoId(Long carrinhoId);

    @Query("SELECT r FROM Reserva r WHERE r.carrinho.id = :carrinhoId AND r.dataUso = :dataUso " +
           "AND r.status != 'CANCELADA' " +
           "AND ((r.horaInicio < :horaFim AND r.horaFim > :horaInicio))")
    List<Reserva> verificarConflito(
        @Param("carrinhoId") Long carrinhoId,
        @Param("dataUso") LocalDate dataUso,
        @Param("horaInicio") java.time.LocalTime horaInicio,
        @Param("horaFim") java.time.LocalTime horaFim
    );
}
