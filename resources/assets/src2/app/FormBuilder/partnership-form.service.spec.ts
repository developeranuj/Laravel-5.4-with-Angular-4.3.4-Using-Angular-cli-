import { TestBed, inject } from '@angular/core/testing';

import { PartnershipFormService } from './partnership-form.service';

describe('PartnershipFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnershipFormService]
    });
  });

  it('should be created', inject([PartnershipFormService], (service: PartnershipFormService) => {
    expect(service).toBeTruthy();
  }));
});
