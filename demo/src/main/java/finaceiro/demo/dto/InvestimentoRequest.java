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
// Importe seu Enum corretamente abaixo (ajuste o pacote se necessário)
import finaceiro.demo.model.TipoInvestimento;

@Data
public class InvestimentoRequest {

    @JsonProperty("NomeInvestimento") // Diz: "O JSON manda com Maiúscula..."
    @NotBlank(message = "O nome não pode ser vazio")
    private String nomeInvestimento;  // "...mas o Java usa minúscula"

    @JsonProperty("ValorInvestimento")
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private BigDecimal valorInvestimento;

    @JsonProperty("DataInvestimento")
    @NotNull(message = "Data é obrigatória")
    private LocalDate dataInvestimento;

    @JsonProperty("TipoInvestimento")
    @NotNull(message = "O tipo é obrigatório") // Use NotNull para Enums!
    // Na classe Investimentos.java (Model)
    @Enumerated(EnumType.STRING) // <--- Garante que salve "CRIPTOMOEDAS" (texto) e não 0, 1, 2...
    private TipoInvestimento tipoInvestimento;
}