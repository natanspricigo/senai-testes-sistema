package br.edu.senai.carrinhos.service;

import br.edu.senai.carrinhos.dto.CarrinhoDTO;
import br.edu.senai.carrinhos.dto.ProfessorDTO;
import br.edu.senai.carrinhos.dto.ReservaDTO;
import br.edu.senai.carrinhos.entity.Carrinho;
import br.edu.senai.carrinhos.entity.Professor;
import br.edu.senai.carrinhos.entity.Reserva;
import br.edu.senai.carrinhos.entity.StatusReserva;
import br.edu.senai.carrinhos.exception.BusinessException;
import br.edu.senai.carrinhos.exception.ResourceNotFoundException;
import br.edu.senai.carrinhos.repository.CarrinhoRepository;
import br.edu.senai.carrinhos.repository.ProfessorRepository;
import br.edu.senai.carrinhos.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservaService {
    private final ReservaRepository repository;
    private final ProfessorRepository professorRepository;
    private final CarrinhoRepository carrinhoRepository;

    public ReservaDTO criar(ReservaDTO dto) {
        // Validações de regra de negócio
        Professor professor = professorRepository.findById(dto.getProfessorId())
            .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));
        
        if (!professor.getAtivo()) {
            throw new BusinessException("Professor inativo não pode fazer reserva");
        }
        
        Carrinho carrinho = carrinhoRepository.findById(dto.getCarrinhoId())
            .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));
        
        if (!carrinho.getAtivo()) {
            throw new BusinessException("Carrinho inativo não pode ser reservado");
        }
        
        if (dto.getHoraFim().compareTo(dto.getHoraInicio()) <= 0) {
            throw new BusinessException("Hora de fim deve ser maior que hora de início");
        }
        
        List<Reserva> conflitos = repository.verificarConflito(
            dto.getCarrinhoId(),
            dto.getDataUso(),
            dto.getHoraInicio(),
            dto.getHoraFim()
        );
        
        if (!conflitos.isEmpty()) {
            throw new BusinessException("Existe conflito de horário com outra reserva");
        }
        
        Reserva reserva = new Reserva();
        reserva.setProfessor(professor);
        reserva.setCarrinho(carrinho);
        reserva.setDataUso(dto.getDataUso());
        reserva.setHoraInicio(dto.getHoraInicio());
        reserva.setHoraFim(dto.getHoraFim());
        reserva.setTurma(dto.getTurma());
        reserva.setObservacao(dto.getObservacao());
        reserva.setStatus(StatusReserva.AGENDADA);
        
        Reserva salva = repository.save(reserva);
        return toDTO(salva);
    }

    public List<ReservaDTO> listar() {
        return repository.findAll()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public ReservaDTO obter(Long id) {
        Reserva reserva = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Reserva não encontrada"));
        return toDTO(reserva);
    }

    public List<ReservaDTO> buscarPorData(LocalDate dataUso) {
        return repository.findByDataUso(dataUso)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public List<ReservaDTO> buscarPorProfessor(Long professorId) {
        return repository.findByProfessorId(professorId)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public List<ReservaDTO> buscarPorCarrinho(Long carrinhoId) {
        return repository.findByCarrinhoId(carrinhoId)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public ReservaDTO cancelar(Long id) {
        Reserva reserva = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Reserva não encontrada"));
        
        if (reserva.getStatus() != StatusReserva.AGENDADA) {
            throw new BusinessException("Apenas reservas agendadas podem ser canceladas");
        }
        
        reserva.setStatus(StatusReserva.CANCELADA);
        Reserva atualizada = repository.save(reserva);
        return toDTO(atualizada);
    }

    public ReservaDTO finalizar(Long id) {
        Reserva reserva = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Reserva não encontrada"));
        
        if (reserva.getStatus() != StatusReserva.AGENDADA) {
            throw new BusinessException("Apenas reservas agendadas podem ser finalizadas");
        }
        
        reserva.setStatus(StatusReserva.FINALIZADA);
        Reserva atualizada = repository.save(reserva);
        return toDTO(atualizada);
    }

    private ReservaDTO toDTO(Reserva reserva) {
        ProfessorDTO professorDTO = new ProfessorDTO(
            reserva.getProfessor().getId(),
            reserva.getProfessor().getNome(),
            reserva.getProfessor().getEmail(),
            reserva.getProfessor().getAtivo()
        );
        
        CarrinhoDTO carrinhoDTO = new CarrinhoDTO(
            reserva.getCarrinho().getId(),
            reserva.getCarrinho().getNumero(),
            reserva.getCarrinho().getDescricao(),
            reserva.getCarrinho().getQuantidadeNotebooks(),
            reserva.getCarrinho().getLocalizacao(),
            reserva.getCarrinho().getAtivo()
        );
        
        return new ReservaDTO(
            reserva.getId(),
            reserva.getProfessor().getId(),
            reserva.getCarrinho().getId(),
            reserva.getDataUso(),
            reserva.getHoraInicio(),
            reserva.getHoraFim(),
            reserva.getTurma(),
            reserva.getObservacao(),
            reserva.getStatus(),
            professorDTO,
            carrinhoDTO
        );
    }
}
