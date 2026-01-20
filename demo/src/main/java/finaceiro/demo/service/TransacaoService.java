package finaceiro.demo.service;

import finaceiro.demo.dto.Transacaorequest;
import finaceiro.demo.model.Transacao;
import finaceiro.demo.model.tipoDeTransacao;
import finaceiro.demo.repository.TransacaoRepository;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // <--- ISSO CONECTA O REPOSITORY AUTOMATICAMENTE
public class TransacaoService {

    private final TransacaoRepository repository; // <--- TEM QUE SER 'PRIVATE FINAL'

    public Transacao criar(Transacaorequest request) {
        Transacao novaTransacao = Transacao.builder()
                .tipoDeTransacao(request.getTipoDeTransacao())
                .valor(request.getValor())
                .descricao(request.getDescricao())
                .data(request.getData())
                .categoria(request.getCategoria())
                .metodoDePagamento(request.getMetodoDePagamento())
                .build();

        repository.save(novaTransacao);

        return transformarParaResponse(novaTransacao);
    }

    public List<Transacao> listarTodas() {
        List<Transacao> transacoes = repository.findAll();
        return transacoes.stream()
                .map(this::transformarParaResponse)
                .collect(Collectors.toList());
    }

    private Transacao transformarParaResponse(Transacao t) {
        return Transacao.builder()
                .id(t.getId())
                .tipoDeTransacao(t.getTipoDeTransacao())
                .valor(t.getValor())
                .descricao(t.getDescricao())
                .data(t.getData())
                .categoria(t.getCategoria())
                .metodoDePagamento(t.getMetodoDePagamento())
                .build();
    }
    public void deletar(UUID id) {
        if (!repository.existsById(id)) {
            throw  new RuntimeException("transação nao encontrada com o ID: " + id);

        }
        repository.deleteById(id);
    }
    public Transacao buscar(UUID id) {
        Transacao transacao = repository.findById(id).orElseThrow(()->new RuntimeException("transacao nao encontrada "));
        return transformarParaResponse(transacao);
    }

    public Transacao atualizar(UUID id, Transacaorequest request) {
        Transacao transacaoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para atualizar!"));

        transacaoExistente.setTipoDeTransacao(request.getTipoDeTransacao());
        transacaoExistente.setValor(request.getValor());
        transacaoExistente.setData(request.getData());
        transacaoExistente.setCategoria(request.getCategoria());
        transacaoExistente.setMetodoDePagamento(request.getMetodoDePagamento());
        transacaoExistente.setTipoDeTransacao(request.getTipoDeTransacao());
        Transacao transacaoatualizada = repository.save(transacaoExistente);
        return transformarParaResponse(transacaoatualizada);
    }

    public List<Transacao> BuscarDataTipo(tipoDeTransacao tipoDeTransacao, LocalDate inicio, LocalDate fim) {
        return  repository.findByTipoDeTransacaoAndDataBetween(tipoDeTransacao, inicio, fim);
    }public List<Transacao>Buscarperiodo(LocalDate inicio, LocalDate fim) {
        return  repository.findByDataBetween(inicio, fim);
    }

    public BigDecimal somarPeriodo(tipoDeTransacao tipoDeTransacao, LocalDate inicio, LocalDate fim) {
        return repository.somarPorTipoEPeriodo(tipoDeTransacao, inicio, fim);
    }
    }

