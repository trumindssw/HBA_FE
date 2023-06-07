import { PreviousRequestsService } from './previousrequests.service';
import { PreviousrequestsComponent } from '../../components/previousrequests/previousrequests.component';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';



describe('PreviousRequestsService', () => {
  let httpClient: HttpClient;
  let service: PreviousRequestsService;

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
      get: jest.fn()
    } as unknown as HttpClient;

    service = new PreviousRequestsService(httpClient);
  });

  it('should make a POST request to getAllRequestsUrl', () => {
    const expectedUrl = 'mockedUrl';
    const expectedToken = 'mockedToken';
    const expectedOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + expectedToken }) };
    const expectedBody = {
      page: 1,
      limit: 10,
      status: 'mockedStatus',
      lastWeek: true,
      lastMonth: false,
      startDate: 'mockedStartDate',
      endDate: 'mockedEndDate',
      searchValue: 'mockedSearchValue',
      today: true
    };
    const expectedResult = { data: 'mockedData' };

    localStorage.getItem = jest.fn().mockReturnValue(expectedToken);
    (httpClient.post as jest.Mock).mockReturnValue(of(expectedResult));

    service.getAllRequests(
      expectedBody.page,
      expectedBody.limit,
      expectedBody.lastWeek,
      expectedBody.lastMonth,
      expectedBody.startDate,
      expectedBody.endDate,
      expectedBody.status,
      expectedBody.searchValue,
     
    ).subscribe(result => {
      expect(result).toEqual(expectedResult);
      expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedOptions);
    });
  });

  it('should make a GET request to getRequestCountsUrl', () => {
    const expectedUrl = 'mockedUrl';
    const expectedToken = 'mockedToken';
    const expectedOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + expectedToken }) };
    const expectedResult = { count: 5 };

    localStorage.getItem = jest.fn().mockReturnValue(expectedToken);
    (httpClient.get as jest.Mock).mockReturnValue(of(expectedResult));

    service.getRequestCounts().subscribe(result => {
      expect(result).toEqual(expectedResult);
      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });
  });
  // describe('getRequestCounts', () => {
    it('should throw an error', () => {
      expect(() => {
        const dummyArgument = {};
        PreviousRequestsService.getRequestCounts(dummyArgument);
      }).toThrowError('Method not implemented.');
    });
  // })
  
  // describe('avgReqPerDay', () => {
    it('should throw an error', () => {
      expect(() => {
        const dummyArgument = {};
        PreviousRequestsService.avgReqPerDay(dummyArgument);
      }).toThrowError('Method not implemented.');
    });
  // });
  
  // describe('avgReqPerWeek', () => {
    it('should throw an error', () => {
      expect(() => {
        const dummyArgument = {};
        PreviousRequestsService.avgReqPerWeek(dummyArgument);
      }).toThrowError('Method not implemented.');
    });
  // });
  
  // describe('totalReq', () => {
    it('should throw an error', () => {
      expect(() => {
        const dummyArgument = {};
        PreviousRequestsService.totalReq(dummyArgument);
      }).toThrowError('Method not implemented.');
    });
  // });
  
  // describe('totalReqWithSubjectFound', () => {
    it('should throw an error', () => {
      expect(() => {
        const dummyArgument = {};
       PreviousRequestsService.totalReqWithSubjectFound(dummyArgument);
      }).toThrowError('Method not implemented.');
    });
  // });
});






