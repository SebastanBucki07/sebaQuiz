import { TestBed } from '@angular/core/testing';

import { ClubHistoryQuestionService } from './club-history-question.service';

describe('ClubHistoryQuestionService', () => {
  let service: ClubHistoryQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubHistoryQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
