package finaceiro.demo.controler;

import finaceiro.demo.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/crypto")
public class CryptoController {
    @Autowired
    private CryptoService cryptoService;
}
