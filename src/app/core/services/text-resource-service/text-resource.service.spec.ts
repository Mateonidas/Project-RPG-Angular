import { TestBed } from '@angular/core/testing';

import { TextResourceService } from './text-resource.service';

describe('TextResourceService', () => {
  let service: TextResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
