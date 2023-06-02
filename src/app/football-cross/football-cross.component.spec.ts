import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCrossComponent } from './football-cross.component';

describe('FootballCrossComponent', () => {
  let component: FootballCrossComponent;
  let fixture: ComponentFixture<FootballCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCrossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
