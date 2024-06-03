import { Component, OnInit } from '@angular/core';
import { OrientationData } from '../models/orientation-data';
import { WebsocketService } from '../services/websocket.service';
import { RxStomp } from '@stomp/rx-stomp';

@Component({
  selector: 'gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.css']
})
export class GunComponent implements OnInit {
  orientationData: OrientationData = new OrientationData();
  rawOrientationEvent: DeviceOrientationEvent | null = null;
  
  private ws: RxStomp;
  private previousOrientationData: OrientationData = new OrientationData();

  constructor(private websocketService: WebsocketService) {
    this.ws = this.websocketService.createWebsocket();
  }
  
  ngOnInit(): void {
    window.addEventListener("deviceorientation",(event: DeviceOrientationEvent) => {
      this.rawOrientationEvent = event;
      if (event.alpha && event.gamma && event.beta) {
        let isScreenDown = (event.gamma > 0);
        this.orientationData.rotateDegrees = this.processRotateDegrees(event.alpha, isScreenDown);
        this.orientationData.leftToRight = this.processLeftToRight(event.gamma);
        this.orientationData.frontToBack = this.processFrontToBack(event.beta, isScreenDown);

        if (this.isAllowToSend()) {
          this.ws.publish({ 
            destination: '/logicbottle/gunPosition', 
            body: JSON.stringify(this.orientationData.toRest())
          }); 
          this.previousOrientationData.rotateDegrees = this.orientationData.rotateDegrees;
          this.previousOrientationData.leftToRight = this.orientationData.leftToRight;
          this.previousOrientationData.frontToBack = this.orientationData.frontToBack;
        }
      }
    });
  }

  private processRotateDegrees(rotateDegrees: number, isScreenDown: boolean) {
    return isScreenDown ? (180 - rotateDegrees) : (180 + rotateDegrees);
  }

  private processLeftToRight(leftToRight: number) {
    return leftToRight > 0 ? 90 : -90;
  }

  private processFrontToBack(frontToBack: number, isScreenDown: boolean) {
    return isScreenDown ? frontToBack : (-1 * frontToBack);
  }

  private isAllowToSend() {
    return Math.abs(this.previousOrientationData.frontToBack - this.orientationData.frontToBack) > 2 
      || Math.abs(this.previousOrientationData.leftToRight - this.orientationData.leftToRight) > 2
      || Math.abs(this.previousOrientationData.rotateDegrees - this.orientationData.rotateDegrees) > 2;
  }

  roundUp(num: number|null|undefined) {
    if (num) {
      return Math.round(num * 100) / 100;
    }
    
    return num;
  }
}
