import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getCartIdResolver } from './get-cart-id.resolver';

describe('getCartIdResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getCartIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
