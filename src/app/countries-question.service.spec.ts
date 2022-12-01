import { TestBed } from '@angular/core/testing';

import { CountriesQuestionService } from './countries-question.service';

describe('CountriesQuestionService', () => {
  let service: CountriesQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
