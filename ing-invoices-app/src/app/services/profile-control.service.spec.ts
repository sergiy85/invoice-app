import { TestBed } from '@angular/core/testing';

import { ProfileControlService } from './profile-control.service';

describe('ProfileControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileControlService = TestBed.get(ProfileControlService);
    expect(service).toBeTruthy();
  });
});
