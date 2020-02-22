import { TestBed, async, inject } from '@angular/core/testing';

import { InvoiceGuard } from './invoice.guard';

describe('InvoiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceGuard]
    });
  });

  it('should ...', inject([InvoiceGuard], (guard: InvoiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
