import { TestBed } from '@angular/core/testing';

import { YoutubeQuestionService } from './youtube-question.service';

describe('YoutubeQuestionService', () => {
  let service: YoutubeQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
