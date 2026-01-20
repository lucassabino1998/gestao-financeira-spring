package finaceiro.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
@Entity
@Table(name = "tb_Investimentos")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Investimentos {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Enumerated(EnumType.STRING)
    private TipoInvestimento TipoInvestimento;

    private BigDecimal ValorInvestimento;
    private String NomeInvestimento;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate DataInvestimento;

}
