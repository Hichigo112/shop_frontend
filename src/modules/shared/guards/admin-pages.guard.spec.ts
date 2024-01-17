import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminPagesGuard } from './admin-pages.guard';

describe('adminPagesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminPagesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
