package finaceiro.demo.controler;

import finaceiro.demo.dto.Transacaorequest;
import finaceiro.demo.model.Transacao;
import finaceiro.demo.model.tipoDeTransacao;
import finaceiro.demo.service.TransacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.ReactiveOffsetScrollPositionHandlerMethodArgumentResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.text.DateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transacoes")
@RequiredArgsConstructor
public class transacaocontroler {


    private final TransacaoService transacaoService;

    @PostMapping
    public Transacao criar(@RequestBody @Valid Transacaorequest transacaorequest) {
        return transacaoService.criar(transacaorequest);
    }

    @GetMapping
    public List<Transacao> buscarTodos() {
        return transacaoService.listarTodas();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscar(@PathVariable UUID id) {
        return ResponseEntity.ok(transacaoService.buscar(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        transacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable UUID id, @RequestBody @Valid Transacaorequest request) {
        // Passamos o 'request' (os dados do Postman) e não um 'new' objeto
        return ResponseEntity.ok(transacaoService.atualizar(id, request));
    }
    @GetMapping("/Buscar")
    public ResponseEntity<List<Transacao>> BuscarTodos(@RequestParam tipoDeTransacao tipoDeTransacao,
                                                       @RequestParam LocalDate inicio,
                                                       @RequestParam LocalDate fim) {
        return ResponseEntity.ok(transacaoService.BuscarDataTipo(tipoDeTransacao, inicio, fim));
    }
    @GetMapping("/soma-periodo")
    public ResponseEntity<BigDecimal> buscarSoma(
            @RequestParam("tipo") tipoDeTransacao tipoDeTransacao,
            @RequestParam("inicio") LocalDate inicio,
            @RequestParam("fim") LocalDate fim) {

        BigDecimal total = transacaoService.somarPeriodo(tipoDeTransacao, inicio, fim);
        return ResponseEntity.ok(total);
    }
}