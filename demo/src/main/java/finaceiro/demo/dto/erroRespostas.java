package finaceiro.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class erroRespostas {
    private String mensagem;
    private List<String> detalhes;
}
