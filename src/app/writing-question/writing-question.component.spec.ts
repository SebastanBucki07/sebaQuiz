import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingQuestionComponent } from './writing-question.component';

describe('WritingQuestionComponent', () => {
  let component: WritingQuestionComponent;
  let fixture: ComponentFixture<WritingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
