import { TestBed, inject } from '@angular/core/testing';

import { BuilderserviceService } from './builderservice.service';

describe('BuilderserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuilderserviceService]
    });
  });

  it('should be created', inject([BuilderserviceService], (service: BuilderserviceService) => {
    expect(service).toBeTruthy();
  }));
});
