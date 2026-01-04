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
@Table(name = "tb_transacoes")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private tipoDeTransacao tipoDeTransacao;

    private BigDecimal valor;
    private String descricao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;


    private String categoria;
    private String metodoDePagamento;
}
