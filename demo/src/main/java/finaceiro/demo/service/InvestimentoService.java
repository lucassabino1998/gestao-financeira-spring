package finaceiro.demo.service;

import finaceiro.demo.dto.InvestimentoRequest;
import finaceiro.demo.model.Investimentos;

import finaceiro.demo.repository.InvestimentoRepository;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor // <--- ISSO CONECTA O REPOSITORY AUTOMATICAMENTE
public class InvestimentoService {

    private final InvestimentoRepository investimentorepository;

    public Investimentos criar(InvestimentoRequest investRequest) {
        Investimentos NovoInvestimento = Investimentos.builder().
                TipoInvestimento(investRequest.getTipoInvestimento()).
                ValorInvestimento(investRequest.getValorInvestimento()).
                DataInvestimento(investRequest.getDataInvestimento()).
                NomeInvestimento(investRequest.getNomeInvestimento())
                .build();
        investimentorepository.save(NovoInvestimento);

        return NovoInvestimento;
    }

    private Investimentos tranformarParaResponse(Investimentos inves){
        return Investimentos.builder().
                id(inves.getId()).
                ValorInvestimento(inves.getValorInvestimento()).
                TipoInvestimento(inves.getTipoInvestimento()).
                DataInvestimento(inves.getDataInvestimento()).
                NomeInvestimento(inves.getNomeInvestimento()).
                build();

    }
    public List<Investimentos> ListarInvestimentos(){
        List<Investimentos> investimentos = investimentorepository.findAll();
        return investimentos.stream()
                .map(this::tranformarParaResponse).
                collect(Collectors.toList());

    }

    public  void  deletar(UUID id){
        if (!investimentorepository.existsById(id)){
            throw new RuntimeException("investimento nao encontrada com o ID: " + id);
        }
        investimentorepository.deleteById(id);
    }

    public Investimentos Atualizar(UUID id, InvestimentoRequest investimentoRequest){
        Investimentos investimentosExistente = investimentorepository.findById(id).
                orElseThrow(()->new RuntimeException("Investimento nao encontrado "));

        investimentosExistente.setValorInvestimento(investimentoRequest.getValorInvestimento());
        investimentosExistente.setDataInvestimento(investimentoRequest.getDataInvestimento());
        investimentosExistente.setNomeInvestimento(investimentoRequest.getNomeInvestimento());
        investimentosExistente.setTipoInvestimento(investimentoRequest.getTipoInvestimento());
        Investimentos investimentosAtualizado = investimentorepository.save(investimentosExistente);
        return tranformarParaResponse(investimentosAtualizado);
    }

}

