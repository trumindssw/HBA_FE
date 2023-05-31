import { TestBed } from '@angular/core/testing';

import { RequestdetailsService } from '../requestdetails/requestdetails.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestdetailsService', () => {
  let service: RequestdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestdetailsService]
    });
    service = TestBed.inject(RequestdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
