import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrDisplayComponent } from './vr-display.component';

describe('VrDisplayComponent', () => {
  let component: VrDisplayComponent;
  let fixture: ComponentFixture<VrDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
