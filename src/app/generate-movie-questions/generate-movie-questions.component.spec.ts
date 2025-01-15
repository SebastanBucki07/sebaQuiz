import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenerateMovieQuestionsComponent } from './generate-movie-questions.component'

describe('GenerateMovieQuestionsComponent', () => {
  let component: GenerateMovieQuestionsComponent
  let fixture: ComponentFixture<GenerateMovieQuestionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateMovieQuestionsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GenerateMovieQuestionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
