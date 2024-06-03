import { Component, OnInit } from '@angular/core';
import { OrientationData } from '../models/orientation-data';
import { WebsocketService } from '../services/websocket.service';
import { RxStomp } from '@stomp/rx-stomp';

@Component({
  selector: 'vr-display',
  templateUrl: './vr-display.component.html',
  styleUrls: ['./vr-display.component.css']
})
export class VrDisplayComponent implements OnInit {
  orientationData: OrientationData = new OrientationData();
  private ws: RxStomp;
  private isZoomIn: boolean = false;
  
  constructor(private websocketService: WebsocketService) {
    this.ws = this.websocketService.createWebsocket();
    this.setupDeviceOrientationListener();
  }

  ngOnInit(): void {
  }

  private setupDeviceOrientationListener() {
    this.ws.watch("/topic/gunPosition").subscribe((data: any) => {
      this.orientationData = OrientationData.fromJson(JSON.parse(data.body));
      const vrGunEle = document.getElementById("vr-gun");

      if (vrGunEle) {
        vrGunEle.style.transform = `perspective(600px) ${this.getRotateStr()} ${this.getTranslateStr()}`;
      }
    });
  }

  private getTranslateStr() {
    return this.isZoomIn ? `translateY(1000px)` : "";
  }

  private getRotateStr() {
    return `rotateX(${this.orientationData.frontToBack}deg) rotateY(${this.orientationData.rotateDegrees}deg) rotateZ(${this.orientationData.leftToRight}deg)`;
  }
}
