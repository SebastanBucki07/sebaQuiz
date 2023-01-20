import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballGamesComponent } from './football-games.component';

describe('FootballGamesComponent', () => {
  let component: FootballGamesComponent;
  let fixture: ComponentFixture<FootballGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
