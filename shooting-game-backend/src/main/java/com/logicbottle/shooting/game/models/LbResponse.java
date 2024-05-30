package com.logicbottle.shooting.game.models;

import org.json.simple.JSONObject;

public class LbResponse {
  public Code code;
  public String message;
  public JSONObject data;

  private LbResponse() {}

  public enum Code {
    SUCCESS,
    FAIL
  }

  public static LbResponse Success(final String message) {
    final LbResponse response = new LbResponse();
    response.code = Code.SUCCESS;
    response.message = message;
    return response;
  }
}
