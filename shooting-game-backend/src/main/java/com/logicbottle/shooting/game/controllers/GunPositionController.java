package com.logicbottle.shooting.game.controllers;

import com.logicbottle.shooting.game.models.GunPositionData;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GunPositionController {
  @MessageMapping("/deviceOrientation")
  @SendTo("/topic/deviceOrientation")
  public GunPositionData getGunPositionData(final GunPositionData gunPositionData) {
//    System.out.println(deviceOrientationData);
    return gunPositionData;
  }
}
