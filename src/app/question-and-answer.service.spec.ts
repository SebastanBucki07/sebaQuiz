import { TestBed } from '@angular/core/testing';

import { QuestionAndAnswerService } from './question-and-answer.service';

describe('QuestionAndAnswerService', () => {
  let service: QuestionAndAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAndAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
