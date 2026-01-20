package finaceiro.demo.dto;

import finaceiro.demo.model.Categoria;
import finaceiro.demo.model.MetodoDePagamento;
import finaceiro.demo.model.tipoDeTransacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Transacaorequest {
    @NotNull(message = "o tipo é obrigatorio")
    private tipoDeTransacao tipoDeTransacao;

    @NotNull(message = "valor é obrigatorio")
    @Positive(message = "valor deve ser possitivo")
    private BigDecimal valor;

    @NotBlank(message = "a descrição nao pode ser vazia")
    private String descricao;

    @NotNull(message = "obrigatorio data")
    private LocalDate data;

    @NotNull(message = "Categoria obrigatoria")
    private Categoria categoria;
    @NotNull(message = "campo metodo obrigatorio")
    private MetodoDePagamento metodoDePagamento;
}
