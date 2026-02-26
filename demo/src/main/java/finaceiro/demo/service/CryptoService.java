package finaceiro.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class CryptoService {
    public Double consultarValorCripto(String idCripto) {
        String url = "https://api.coingecko.com/api/v3/simple/price?ids=" + idCripto + "&vs_currencies=brl";
        RestTemplate restTemplate = new RestTemplate();

        try {
            String jsonResposta = restTemplate.getForObject(url, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonResposta);

            // Navega e pega o valor: {"bitcoin": {"brl": 350000.0}}
            return rootNode.get(idCripto).get("brl").asDouble();

        } catch (Exception e) {
            return 0.0;
        }
    }
}
