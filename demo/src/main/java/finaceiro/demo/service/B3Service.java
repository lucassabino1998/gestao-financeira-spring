package finaceiro.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class B3Service {
    public Double consultarAcao(String ticker) {
        String token = "cT9kSEdxpT6fRHRMpTvDvZ";

        String url = "https://brapi.dev/api/quote/" + ticker + "?token=" + token + "&range=1d&interval=1d&fundamental=false";

        RestTemplate restTemplate = new RestTemplate();

        try {
            // 1. Pega o JSON bruto
            String jsonResposta = restTemplate.getForObject(url, String.class);

            // 2. Prepara o leitor (Jackson)
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonResposta);

            // 3. Navega até o preço: results -> item 0 -> regularMarketPrice
            JsonNode precoNode = rootNode.get("results").get(0).get("regularMarketPrice");

            // 4. Retorna o valor como número
            return precoNode.asDouble();

        } catch (Exception e) {
            // Se der erro (ex: ação não existe), avisa no console e retorna 0
            System.out.println("Erro ao buscar cotação: " + e.getMessage());
            return 0.0;
        }
    }

}
