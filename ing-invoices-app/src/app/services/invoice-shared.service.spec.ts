import { TestBed } from '@angular/core/testing';

import { InvoiceSharedService } from './invoice-shared.service';

describe('InvoiceSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceSharedService = TestBed.get(InvoiceSharedService);
    expect(service).toBeTruthy();
  });
});
