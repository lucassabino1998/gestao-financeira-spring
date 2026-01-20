package finaceiro.demo.controler;

import finaceiro.demo.dto.InvestimentoRequest;
import finaceiro.demo.model.Investimentos;
import finaceiro.demo.repository.InvestimentoRepository;
import finaceiro.demo.service.InvestimentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/investimentos")
@RequiredArgsConstructor
public class InvertimentoControler {

    private final InvestimentoService investimentoService;

    @PostMapping
    public Investimentos NovoInvestimento(@RequestBody InvestimentoRequest investimentoRequest){
        return investimentoService.criar(investimentoRequest);
    }
    @GetMapping
    public List<Investimentos> ListarInvestimentos(){
        return investimentoService.ListarInvestimentos();
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id){
        investimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Investimentos> investimentoAtualizar(@PathVariable UUID id, @RequestBody @Valid InvestimentoRequest investimentoRequest){
        return  ResponseEntity.ok(investimentoService.Atualizar(id, investimentoRequest));
    }

}
