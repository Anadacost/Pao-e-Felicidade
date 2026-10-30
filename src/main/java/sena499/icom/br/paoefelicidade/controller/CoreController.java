package sena499.icom.br.paoefelicidade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CoreController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/agendamentos")
    public String agendamentos() {
        return "agendamentos";
    }

    @GetMapping("/carrinho")
    public String carrinho() {
        return "carrinho";
    }

    @GetMapping("/food-to-save")
    public String foodToSave() {
        return "food-to-save";
    }


}