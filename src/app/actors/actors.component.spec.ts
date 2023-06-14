import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MoviesActorsComponent, SerialsActorsComponent } from './actors.component'

describe('ActorsComponent', () => {
  let component: MoviesActorsComponent
  let fixture: ComponentFixture<MoviesActorsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesActorsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MoviesActorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

describe('SerialsActorsComponent', () => {
  let component: SerialsActorsComponent
  let fixture: ComponentFixture<SerialsActorsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerialsActorsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SerialsActorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
