import { TestBed } from '@angular/core/testing';

import { EnviorementsService } from './enviorements.service';

describe('EnviorementsService', () => {
  let service: EnviorementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviorementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
