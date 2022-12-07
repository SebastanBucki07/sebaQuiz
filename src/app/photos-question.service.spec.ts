import { TestBed } from '@angular/core/testing';

import { PhotosQuestionService } from './photos-question.service';

describe('PhotosQuestionService', () => {
  let service: PhotosQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
