package finaceiro.demo.controler;

import finaceiro.demo.service.B3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/b3")
public class B3Controller {
    @Autowired
    private B3Service b3Service;

}
