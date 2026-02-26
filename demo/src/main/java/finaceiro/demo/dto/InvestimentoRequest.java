package finaceiro.demo.dto; // Mantenha o pacote como está no seu projeto

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

import finaceiro.demo.model.TipoInvestimento;

@Data
public class InvestimentoRequest {

    @JsonProperty("NomeInvestimento")
    @NotBlank(message = "O nome não pode ser vazio")
    private String nomeInvestimento;  //

    @JsonProperty("ValorInvestimento")
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private BigDecimal valorInvestimento;

    @JsonProperty("DataInvestimento")
    @NotNull(message = "Data é obrigatória")
    private LocalDate dataInvestimento;

    @JsonProperty("TipoInvestimento")
    @NotNull(message = "O tipo é obrigatório")

    @Enumerated(EnumType.STRING)
    private TipoInvestimento tipoInvestimento;

    @JsonProperty("quantidade")
    @Positive(message = "A quantidade deve ser positiva")
    private BigDecimal quantidade;
}