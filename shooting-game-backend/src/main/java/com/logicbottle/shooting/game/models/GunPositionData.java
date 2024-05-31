package com.logicbottle.shooting.game.models;

public class GunPositionData {
  private float rotateDegrees;
  private float leftToRight;
  private float frontToBack;

  public float getRotateDegrees() {
    return rotateDegrees;
  }

  public void setRotateDegrees(float rotateDegrees) {
    this.rotateDegrees = rotateDegrees;
  }

  public float getLeftToRight() {
    return leftToRight;
  }

  public void setLeftToRight(float leftToRight) {
    this.leftToRight = leftToRight;
  }

  public float getFrontToBack() {
    return frontToBack;
  }

  public void setFrontToBack(float frontToBack) {
    this.frontToBack = frontToBack;
  }

  @Override
  public String toString() {
    return "GunPositionData{" +
            "rotateDegrees=" + rotateDegrees +
            ", leftToRight=" + leftToRight +
            ", frontToBack=" + frontToBack +
            '}';
  }
}
