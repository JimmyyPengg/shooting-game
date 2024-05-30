import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.css']
})
export class GunComponent implements OnInit {

  rawOrientationEvent: DeviceOrientationEvent | null = null;

  ngOnInit(): void {
    window.addEventListener("deviceorientation", (event: DeviceOrientationEvent) => {
      this.rawOrientationEvent = event;
    })
  }

  roundUp(num: number|null|undefined) {
    if (num) {
      return Math.round(num * 100) / 100;
    }
    
    return num;
  }
}
