import { TestBed } from '@angular/core/testing';

import { ActorsQuestionService } from './actors-question.service';

describe('ActorsQuestionService', () => {
  let service: ActorsQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorsQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
