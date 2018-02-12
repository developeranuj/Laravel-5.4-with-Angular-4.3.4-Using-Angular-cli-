import { TestBed, inject } from '@angular/core/testing';

import { NewpartnershipService } from './newpartnership.service';

describe('NewpartnershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewpartnershipService]
    });
  });

  it('should be created', inject([NewpartnershipService], (service: NewpartnershipService) => {
    expect(service).toBeTruthy();
  }));
});
