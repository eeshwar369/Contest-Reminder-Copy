import { TestBed } from '@angular/core/testing';

import { CustomAnimationService } from './custom-animation.service';

describe('CustomAnimationService', () => {
  let service: CustomAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
