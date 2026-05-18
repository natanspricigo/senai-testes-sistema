package br.edu.senai.carrinhos.service;

import br.edu.senai.carrinhos.dto.CarrinhoDTO;
import br.edu.senai.carrinhos.entity.Carrinho;
import br.edu.senai.carrinhos.exception.BusinessException;
import br.edu.senai.carrinhos.exception.ResourceNotFoundException;
import br.edu.senai.carrinhos.repository.CarrinhoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarrinhoService {
    private final CarrinhoRepository repository;

    public CarrinhoDTO criar(CarrinhoDTO dto) {
        if (repository.existsByNumero(dto.getNumero())) {
            throw new BusinessException("Carrinho com este número já existe");
        }
        Carrinho carrinho = new Carrinho();
        carrinho.setNumero(dto.getNumero());
        carrinho.setDescricao(dto.getDescricao());
        carrinho.setQuantidadeNotebooks(dto.getQuantidadeNotebooks());
        carrinho.setLocalizacao(dto.getLocalizacao());
        carrinho.setAtivo(true);
        Carrinho salvo = repository.save(carrinho);
        return toDTO(salvo);
    }

    public List<CarrinhoDTO> listar() {
        return repository.findAll()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public CarrinhoDTO obter(Long id) {
        Carrinho carrinho = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));
        return toDTO(carrinho);
    }

    public CarrinhoDTO atualizar(Long id, CarrinhoDTO dto) {
        Carrinho carrinho = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));
        
        if (!carrinho.getNumero().equals(dto.getNumero()) && 
            repository.existsByNumero(dto.getNumero())) {
            throw new BusinessException("Carrinho com este número já existe");
        }
        
        carrinho.setNumero(dto.getNumero());
        carrinho.setDescricao(dto.getDescricao());
        carrinho.setQuantidadeNotebooks(dto.getQuantidadeNotebooks());
        carrinho.setLocalizacao(dto.getLocalizacao());
        Carrinho atualizado = repository.save(carrinho);
        return toDTO(atualizado);
    }

    public CarrinhoDTO inativar(Long id) {
        Carrinho carrinho = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));
        carrinho.setAtivo(false);
        Carrinho atualizado = repository.save(carrinho);
        return toDTO(atualizado);
    }

    public CarrinhoDTO ativar(Long id) {
        Carrinho carrinho = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));
        carrinho.setAtivo(true);
        Carrinho atualizado = repository.save(carrinho);
        return toDTO(atualizado);
    }

    private CarrinhoDTO toDTO(Carrinho carrinho) {
        return new CarrinhoDTO(
            carrinho.getId(),
            carrinho.getNumero(),
            carrinho.getDescricao(),
            carrinho.getQuantidadeNotebooks(),
            carrinho.getLocalizacao(),
            carrinho.getAtivo()
        );
    }
}
