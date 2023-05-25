import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  WritingQuestionComponent,
  WritingQuestionFootballComponent,
  WritingQuestionRestComponent,
} from './writing-question.component'

describe('WritingQuestionFootballComponent', () => {
  let component: WritingQuestionFootballComponent
  let fixture: ComponentFixture<WritingQuestionFootballComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WritingQuestionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WritingQuestionFootballComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

describe('WritingQuestionRestComponent', () => {
  let component: WritingQuestionRestComponent
  let fixture: ComponentFixture<WritingQuestionRestComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WritingQuestionRestComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WritingQuestionRestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
