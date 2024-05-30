package com.logicbottle.shooting.game.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EchoController {
  @GetMapping("/echo/{content}")
  public String echo(@PathVariable String content) {
    return "Shooting game backend: " + content;
  }
}
