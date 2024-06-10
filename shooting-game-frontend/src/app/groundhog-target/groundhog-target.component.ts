import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'groundhog-target',
  templateUrl: './groundhog-target.component.html',
  styleUrls: ['./groundhog-target.component.css']
})
export class GroundhogTargetComponent implements OnInit {
  targetId: number = Math.floor(Math.random() * 10000000);
  isAppeared: boolean = false;
  @Input() isSmall: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  shoot() {
    const groundhog = document.getElementById(this.targetId + "-groundhog");
    const deadGroundhog = document.getElementById(this.targetId + "-dead-groundhog");
    if (deadGroundhog && groundhog && this.isAppeared === true) {
      groundhog.style.animationName = "";
      groundhog.style.display = "none";
      deadGroundhog.style.display = "block";
      deadGroundhog.style.animationName = "groundhog-dead-down";

      // reset
      setTimeout(() => {
        if (deadGroundhog) {
          deadGroundhog.style.display = "none";
          deadGroundhog.style.animationName = "";
        }
      }, 1000);
    }

    this.isAppeared = false;
  }

  groundhogAppear() {
    const grassLeft = document.getElementById(this.targetId + "-left");
    const grassRight = document.getElementById(this.targetId + "-right");
    const groundhog = document.getElementById(this.targetId + "-groundhog");

    if (groundhog && grassLeft && grassRight) {
      this.isAppeared = true;
      grassLeft.style.animationName = "grass-shaking-left";
      grassRight.style.animationName = "grass-shaking-right";
      setTimeout(() => {
        if (groundhog) {
          groundhog.style.display = "block";
          groundhog.style.animationName = "groundhog-appear";
        }
      }, 50);

      // reset
      setTimeout(() => {
        if (groundhog && grassLeft && grassRight) {
          if (this.isAppeared === true) {
            groundhog.style.animationName = "groundhog-hide";
          }
          
          grassLeft.style.animationName = "";
          grassRight.style.animationName = "";
        }
        this.isAppeared = false;
      }, 1500);
    }
  }

  isHitTarget(positionX: number, positionY: number) {
    const targetEle = document.getElementById(this.targetId+"-groundhog");
    if (targetEle) {
      const position = targetEle.getBoundingClientRect();
      return position.x <= positionX && positionX <= position.x + position.width
          && position.y <= positionY && positionY <= position.y + position.height;
    }

    return false;
  }
}
