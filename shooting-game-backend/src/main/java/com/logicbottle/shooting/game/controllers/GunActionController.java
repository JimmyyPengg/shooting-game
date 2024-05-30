package com.logicbottle.shooting.game.controllers;

import com.logicbottle.shooting.game.models.Action;
import com.logicbottle.shooting.game.models.ActionType;
import com.logicbottle.shooting.game.models.LbResponse;
import com.logicbottle.shooting.game.models.ScaleData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/action")
@CrossOrigin(origins = "https://192.168.1.2:4200")
public class GunActionController {
  @Autowired
  private SimpMessagingTemplate template;

  @PostMapping("/pullTrigger")
  public LbResponse pullTrigger() {
    final Action action = new Action();
    action.setActionType(ActionType.PULL_TRIGGER);

    template.convertAndSend("/topic/action", action);
    return LbResponse.Success("pull trigger success.");
  }

  @PostMapping("/changeScale")
  public LbResponse changeScale(@RequestBody final ScaleData scaleData) {
    final Action action = new Action();
    action.setActionType(ActionType.CHANGE_SCALE);
    action.addData("scaleData", scaleData);

    template.convertAndSend("/topic/action", action);
    return LbResponse.Success("change scale success.");
  }
}
