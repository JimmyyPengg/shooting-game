import { Component, OnInit, ViewChild } from '@angular/core';
import { OrientationData } from '../models/orientation-data';
import { WebsocketService } from '../services/websocket.service';
import { RxStomp } from '@stomp/rx-stomp';
import { Action } from '../models/action';
import { ActionType } from '../models/action-type';
import { ScaleData } from '../models/scale-data';
import { ScaleType } from '../models/scale-type';
import { GroundhogTargetComponent } from '../groundhog-target/groundhog-target.component';

@Component({
  selector: 'vr-display',
  templateUrl: './vr-display.component.html',
  styleUrls: ['./vr-display.component.css']
})
export class VrDisplayComponent implements OnInit {
  @ViewChild("target1", {static: true}) groundHogTarget1: GroundhogTargetComponent;
  @ViewChild("target2", {static: true}) groundHogTarget2: GroundhogTargetComponent;
  @ViewChild("target3", {static: true}) groundHogTarget3: GroundhogTargetComponent;
  @ViewChild("target4", {static: true}) groundHogTarget4: GroundhogTargetComponent;

  @ViewChild("farTarget1", {static: true}) groundHogFarTarget1: GroundhogTargetComponent;
  @ViewChild("farTarget2", {static: true}) groundHogFarTarget2: GroundhogTargetComponent;
  
  orientationData: OrientationData = new OrientationData();
  groundhogTargetList: GroundhogTargetComponent[] = [];
  private ws: RxStomp;
  private readonly zoomInFrontSightSize: number = 500;
  private isZoomIn: boolean = false;
  private frontSightPosition: {x: number, y: number} = {x:0, y:0};
  
  constructor(private websocketService: WebsocketService) {
    this.ws = this.websocketService.createWebsocket();
    this.setupDeviceOrientationListener();
    this.setupActionListener();
  }

  ngOnInit(): void {
    this.groundhogTargetList = this.groundhogTargetList.concat(
      this.groundHogTarget1, 
      this.groundHogTarget2, 
      this.groundHogTarget3,
      this.groundHogTarget4,
      this.groundHogFarTarget1,
      this.groundHogFarTarget2);

    setInterval(() => {
      let randomNum = Math.floor(Math.random() * 6);
      if (randomNum === 0) {
        this.groundHogTarget1?.groundhogAppear();
      } else if (randomNum === 1) {
        this.groundHogTarget2?.groundhogAppear();
      } else if (randomNum === 2) {
        this.groundHogTarget3?.groundhogAppear();
      } else if (randomNum === 3) {
        this.groundHogTarget4?.groundhogAppear();
      } else if (randomNum === 4) {
        this.groundHogFarTarget1?.groundhogAppear();
      } else if (randomNum === 5) {
        this.groundHogFarTarget2?.groundhogAppear();
      }
      
    }, 2000);

  }

  private setupDeviceOrientationListener() {
    this.ws.watch("/topic/gunPosition").subscribe((data: any) => {
      this.orientationData = OrientationData.fromJson(JSON.parse(data.body));
      const vrGunEle = document.getElementById("vr-gun");
      const frontSightEle = document.getElementById("front-sight");
      const zoomInSightEle = document.getElementById("zoom-in-sight");

      if (vrGunEle && frontSightEle && zoomInSightEle) {
        vrGunEle.style.transform = `perspective(600px) ${this.getRotateStr()} ${this.getTranslateStr()}`;
        const position = frontSightEle.getBoundingClientRect();
        this.frontSightPosition.x = position.x;
        this.frontSightPosition.y = position.y;

        if (this.isZoomIn) {
          zoomInSightEle.style.top = position.y + "px";
          zoomInSightEle.style.left = position.x + "px";
        }
      }
    });
  }

  private setupActionListener() {
    this.ws.watch("/topic/action").subscribe((data: any) => {
      const action = Action.fromJson(JSON.parse(data.body));
      
      if (action.actionType === ActionType.PULL_TRIGGER) {
        this.fireBullet();
        this.checkIfHitTarget();
      } else if (action.actionType === ActionType.CHANGE_SCALE) {
        const scaleData = ScaleData.fromJson(action.data.scaleData);
        this.changeScale(scaleData);
      }
      
    });
  }

  private getTranslateStr() {
    return this.isZoomIn ? `translateY(1000px)` : "";
  }

  private getRotateStr() {
    return `rotateX(${this.orientationData.frontToBack}deg) rotateY(${this.orientationData.rotateDegrees}deg) rotateZ(${this.orientationData.leftToRight}deg)`;
  }

  private checkIfHitTarget() {
    this.groundhogTargetList
        .filter(groundHog => groundHog.isHitTarget(this.frontSightPosition.x, this.frontSightPosition.y))
        .forEach(groundHog => groundHog.shoot())
  }

  private fireBullet() {
    const bulletHorizontal = document.getElementById("bullet-horizontal");
    const bulletVertical = document.getElementById("bullet-vertical");
    
    if (bulletHorizontal && bulletVertical) {
      new Audio('https://192.168.1.2:4200/assets/audio/shoot.mp3').play();
      this.setBulletAnimation(bulletHorizontal);
      this.setBulletAnimation(bulletVertical);
    }
  }

  private setBulletAnimation(bulletEle: HTMLElement) {
    bulletEle.style.animationName = "fire-bullet";
    bulletEle.style.display = "block";
    setTimeout(() => {
      bulletEle.style.animationName = "";
      bulletEle.style.display = "none";
    }, 100);
  }

  private changeScale(scaleData: ScaleData) {
    if (scaleData.scaleType === ScaleType.ZOOM_IN) {
      this.zoomIn();
    } else if (scaleData.scaleType === ScaleType.ZOOM_OUT) {
      this.zoomOut();
    } 
  }

  private zoomIn() {
    const backgroundEle = document.getElementById("background");
    const zoomInSightEle = document.getElementById("zoom-in-sight");
    const vrGunEle = document.getElementById("vr-gun");
    const starEle = document.getElementById("star");
    const frontSightEle = document.getElementById("front-sight");
    this.isZoomIn = true;
    
    new Audio('https://192.168.1.2:4200/assets/audio/sniper-ready.mp3').play();
    if (backgroundEle && zoomInSightEle && vrGunEle && starEle && frontSightEle) {
      backgroundEle.style.transformOrigin = `${this.frontSightPosition.x}px ${this.frontSightPosition.y}px`
      backgroundEle.style.transform = `scale(2)`;
      zoomInSightEle.style.display = "block";
      zoomInSightEle.style.top = this.frontSightPosition.y + "px";
      zoomInSightEle.style.left = this.frontSightPosition.x + "px";
      frontSightEle.style.opacity = "0%";

      setTimeout(() => {
        zoomInSightEle.style.height = `${this.zoomInFrontSightSize}px`;
        zoomInSightEle.style.width = `${this.zoomInFrontSightSize}px`;
        vrGunEle.style.transform = `perspective(600px) ${this.getRotateStr()} ${this.getTranslateStr()}`;
        starEle.style.display = "block";
      }, 1);
    }
  }

  private zoomOut() {
    const backgroundEle = document.getElementById("background");
    const zoomInSightEle = document.getElementById("zoom-in-sight");
    const vrGunEle = document.getElementById("vr-gun");
    const starEle = document.getElementById("star");
    const frontSightEle = document.getElementById("front-sight");
    this.isZoomIn = false;

    if (backgroundEle && zoomInSightEle && vrGunEle && starEle && frontSightEle) {
      backgroundEle.style.transform = `scale(1, 1)`;
      zoomInSightEle.style.height = "0px";
      zoomInSightEle.style.width = "0px";
      starEle.style.display = "none";
      frontSightEle.style.opacity = "100%";
      setTimeout(() => {
        zoomInSightEle.style.display = "none";
        vrGunEle.style.transform = `perspective(600px) ${this.getRotateStr()} ${this.getTranslateStr()}`;
      }, 200);
    }
  }
}
