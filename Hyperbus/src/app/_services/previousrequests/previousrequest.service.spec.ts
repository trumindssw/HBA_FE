import { TestBed } from '@angular/core/testing';

import { PreviousRequestsService } from '../previousrequests/previousrequests.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestdetailsService', () => {
  let service: PreviousRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PreviousRequestsService]});
    service = TestBed.inject(PreviousRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
