import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCrossComponent } from './movie-cross.component';

describe('MovieCrossComponent', () => {
  let component: MovieCrossComponent;
  let fixture: ComponentFixture<MovieCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCrossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
