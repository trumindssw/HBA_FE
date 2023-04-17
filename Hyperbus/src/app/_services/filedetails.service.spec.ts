import { TestBed } from '@angular/core/testing';

import { FiledetailsService } from './filedetails.service';

describe('FiledetailsService', () => {
  let service: FiledetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiledetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
