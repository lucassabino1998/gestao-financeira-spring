package finaceiro.demo.repository;

import finaceiro.demo.model.Investimentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvestimentoRepository extends JpaRepository<Investimentos, UUID> {
    // Seus métodos de busca aqui...
}