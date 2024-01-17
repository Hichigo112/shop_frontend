import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { offerPageGuard } from './offer-page.guard';

describe('offerPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => offerPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
