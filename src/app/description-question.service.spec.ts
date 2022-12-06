import { TestBed } from '@angular/core/testing';

import { DescriptionQuestionService } from './description-question.service';

describe('DescriptionQuestionService', () => {
  let service: DescriptionQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
