package finaceiro.demo.repository;

import finaceiro.demo.model.Transacao;
import finaceiro.demo.model.tipoDeTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;



@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, UUID> {
    List<Transacao> findByTipoDeTransacaoAndDataBetween(
            tipoDeTransacao tipoDeTransacao,
            LocalDate inicio,
            LocalDate fim
    );

    List<Transacao> findByDataBetween(
            LocalDate inicio,
            LocalDate fim
    );

    @Query("SELECT SUM(t.valor) FROM Transacao t WHERE t.tipoDeTransacao = :tipoDeTransacao AND t.data BETWEEN :inicio AND :fim")
    BigDecimal somarPorTipoEPeriodo(
            @Param("tipoDeTransacao") tipoDeTransacao tipoDeTransacao,
            @Param("inicio") LocalDate inicio,
            @Param("fim") LocalDate fim
    );

}