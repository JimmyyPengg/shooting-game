import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundhogTargetComponent } from './groundhog-target.component';

describe('GroundhogTargetComponent', () => {
  let component: GroundhogTargetComponent;
  let fixture: ComponentFixture<GroundhogTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundhogTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundhogTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
