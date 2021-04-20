import { TestBed } from '@angular/core/testing';

import { AlumService } from './alum.service';

describe('AlumService', () => {
  let service: AlumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
