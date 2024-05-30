package com.logicbottle.shooting.game.models;

import org.json.simple.JSONObject;

public class Action {
  private ActionType actionType;
  private JSONObject data;

  public Action() {
    data = new JSONObject();
  }

  public ActionType getActionType() {
    return actionType;
  }

  public void setActionType(final ActionType actionType) {
    this.actionType = actionType;
  }

  public JSONObject getData() {
    return data;
  }

  public Action addData(final String field, final Object value) {
    this.data.put(field, value);
    return this;
  }
}
