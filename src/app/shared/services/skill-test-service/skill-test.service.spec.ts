import { TestBed } from '@angular/core/testing';

import { SkillTestService } from './skill-test.service';

describe('SkillTestService', () => {
  let service: SkillTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
