import { TestBed } from '@angular/core/testing';

import { BraveService } from './brave.service';

describe('BraveService', () => {
  let service: BraveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BraveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
