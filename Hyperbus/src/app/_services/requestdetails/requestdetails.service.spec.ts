import { TestBed } from '@angular/core/testing';

import { RequestdetailsService } from './requestdetails.service';

describe('RequestdetailsService', () => {
  let service: RequestdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
