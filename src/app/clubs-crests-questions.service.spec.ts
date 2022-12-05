import { TestBed } from '@angular/core/testing';

import { ClubsCrestsQuestionsService } from './clubs-crests-questions.service';

describe('ClubsCrestsQuestionsService', () => {
  let service: ClubsCrestsQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubsCrestsQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
