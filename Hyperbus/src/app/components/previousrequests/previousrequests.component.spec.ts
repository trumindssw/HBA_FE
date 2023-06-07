import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { RequestdetailsService } from '../../_services/requestdetails/requestdetails.service';
import { PreviousrequestsComponent } from './previousrequests.component';
import { Router } from '@angular/router';
import { PreviousRequestsService } from '../../_services/previousrequests/previousrequests.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';


class MatDialogMock {
  open(): any {
    // Return a mock dialog reference or any desired value
    return {
      afterClosed: () => {
        // Return a mock observable or any desired value
        return of('dialog closed');
      },
    };
  }
}



class HttpClientMock {
  get = jest.fn(() => of({}));
  post = jest.fn(() => of({}));
  put = jest.fn(() => of({}));
  delete = jest.fn(() => of({}));
}

class MockPreviousRequestsService {
  constructor(private http: HttpClient) {}

  getAllRequests(pageNo: number, limit: number, lastWeek: boolean, lastMonth: boolean, startDate: any, endDate: any, status: any, searchString: string) {
    return of (this.http.post(`${environment.apiUrl}/request/getRequestDetail`, { pageNo, limit, lastWeek, lastMonth, startDate, endDate, status, searchString }));
  }
  getRequestCounts() {
    return of (this.http.get(`${environment.apiUrl}/request/getRequestCounts`,{}));
  }
  
}

describe('PreviousrequestsComponent', () => {
  let requestDetailsServicesMock: RequestdetailsService;
  let matDialogDataMock: { name: string };
  let router: Router;
  let previousRequestsService: PreviousRequestsService;
  let mockPreviousRequestsService: MockPreviousRequestsService;
  // let dialog: MatDialogMock;
  // let dialogRefMock: MatDialogRef<PreviousrequestsComponent>;
  let dialogMock: MatDialogMock;
  let dialog: MatDialog;
  let component: PreviousrequestsComponent;
  let http: any;
  let httpClientMock: HttpClientMock;
  let previousRequestsServiceMock: any;
  let paginator: any;
  let service: RequestdetailsService;

  beforeEach(() => {
    dialogMock = new MatDialogMock();
    dialog = dialogMock as unknown as MatDialog;
    http = {
      get: jest.fn(),
      post: jest.fn(),
    };

    previousRequestsService = new PreviousRequestsService(http);
    component = new PreviousrequestsComponent(
      router,
      previousRequestsService,
      dialog
    );
  });

  beforeEach(() => {
    // httpClientMock = {
    //   post: jest.fn(),
    // } as unknown as HttpClient;
    httpClientMock = new HttpClientMock();
    mockPreviousRequestsService = new MockPreviousRequestsService(
      httpClientMock as any
    );
  });
  beforeEach(() => {
    // httpClientMock = new HttpClientMock();
    // previousRequestsServiceMock = new previousRequestsServiceMock(
    //   httpClientMock as any
    // );
    // Mock the PreviousRequestsService
    previousRequestsServiceMock = {
      getRequestCounts: jest.fn().mockReturnValue(of({
        avgReqPerDay: 10,
        avgReqPerWeek: 70,
        totalReq: 100,
        totalReqWithSubjectFound: 80,
        totalReqWithMismatch: 20,
        avgReqPerDayvsLastWeek: 5,
        avgReqPerWeekvsLastWeek: 35,
        totalReqvsLastWeek: 50,
        totalReqWithSubjectFoundvsLastWeek: 40,
        totalReqWithMismatchvsLastWeek: 10,
      })) 
    };
    
  });
  beforeEach(() => {
    
    // component = new YourComponent();
    paginator = { pageIndex: 2 }; 

    component.requests = [/* Mock requests array */];
    component.pageNo = 1; 
    component.limit = 10; 
    component.endDate = new Date(); 
  });
  beforeEach(() => {

    // Set up the necessary dependencies and initial state
    // component = new YourComponent(); // Replace with the actual component or object instantiation
    paginator = { pageIndex: 2 }; 

    component.requests = [/* Mock requests array */]; 
    component.pageNo = 1;
    component.limit = 10; 
    component.prevStatus = 'PreviousStatus'; 
    component.status = 'PreviousStatus'; 
    component.matchFound = true; 
    component.matchNotFound = false; 
    component.internalError = false; 
    component.selectedValueStatus = 'SomeSelectedValue'; 
  });

 

  it('should open a dialog', () => {
    const openSpy = jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of('dialog closed'),
    } as MatDialogRef<any>);

    // Call the openDialog method
    component.openDialog('requestID', { target: { style: {} } });

    // Expectations
    expect(openSpy).toHaveBeenCalled();
  });
  it('should log result after dialog closed', () => {
    const reqId = '123';
    const spyOnOpen = jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of('dialog closed'),
    } as MatDialogRef<any>);

    component.openDialog(reqId, { target: { style: { color: '' } } });

    expect(spyOnOpen).toHaveBeenCalled();
    // expect(reqId).toHaveBeenCalledWith('result');
  });
  it('should set badgeContent to 1 when specific conditions are met', () => {
    // Set the component properties to fulfill the conditions for badgeContent = 1
    component.matchFound = false;
    component.matchNotFound = false;
    component.internalError = false;
    component.lastWeek = true;
    component.lastMonth = false;
    component.startDate = null;
    component.endDate = null;

    // Call the incrementCount() method
    component.incrementCount();

    // Expect badgeContent to be 1
    expect(component.badgeContent).toBe(1);
  });
  it('should set badgeContent to 2 when specific conditions are met', () => {
    // Set the component properties to fulfill the conditions for badgeContent = 2
    component.matchFound = true;
    component.matchNotFound = false;
    component.internalError = true;
    component.lastWeek = false;
    component.lastMonth = true;
    component.startDate = new Date();
    component.endDate = new Date();

    // Call the incrementCount() method
    component.incrementCount();

    // Expect badgeContent to be 2
    expect(component.badgeContent).toBe(2);
  });
  it('should set badgeContent to null when no conditions are met', () => {
    // Set the component properties to not fulfill any condition
    component.matchFound = false;
    component.matchNotFound = false;
    component.internalError = false;
    component.lastWeek = false;
    component.lastMonth = false;
    component.startDate = null;
    component.endDate = null;

    // Call the incrementCount() method
    component.incrementCount();

    // Expect badgeContent to be null
    expect(component.badgeContent).toBeNull();
  });
  it('should set badgeContent to 1 when matchFound, matchNotFound, and internalError are false, and lastWeek, lastMonth, startDate, and endDate have values', () => {
    component.matchFound = false;
    component.matchNotFound = false;
    component.internalError = false;
    component.lastWeek = true;
    component.lastMonth = false;
    component.startDate = '2022-01-01';
    component.endDate = '2022-01-31';

    component.incrementCount();

    expect(component.badgeContent).toBe(1);
  });
  it('should set badgeContent to 2 when matchFound, matchNotFound, or internalError is true and lastWeek, lastMonth, startDate, and endDate have values', () => {
    component.matchFound = true;
    component.matchNotFound = false;
    component.internalError = true;
    component.lastWeek = true;
    component.lastMonth = false;
    component.startDate = '2022-01-01';
    component.endDate = '2022-01-31';

    component.incrementCount();

    expect(component.badgeContent).toBe(2);
  });
  it('should set badgeContent to null when none of the conditions are met', () => {
    component.matchFound = false;
    component.matchNotFound = false;
    component.internalError = false;
    component.lastWeek = false;
    component.lastMonth = false;
    component.startDate = null;
    component.endDate = null;

    component.incrementCount();

    expect(component.badgeContent).toBeNull();
  });

  it('should call getAllRequests with the correct URL', () => {
    // let pageNo: Number= 1,
    //   limit: Number = 10,
    //   lastWeek: boolean = false,
    //   lastMonth: boolean = false,
    //   startDate: any = new Date(),
    //   endDate: any = new Date(),
    //   status: any = '200',
    //   searchString: string = 'mockSearchString';
 
    const mockResponse = { /* mock response data */ };
    const expectedUrl = `${environment.apiUrl}/request/getRequestDetail` 
    
    const expectedData = {
      pageNo: 1,
      limit: 10,
      lastWeek: false,
      lastMonth: true,
      startDate: new Date(),
      endDate: new Date(),
      status: '200',
      searchString: 'ABC',
    };

    (httpClientMock.post as jest.Mock).mockReturnValue(() => of(mockResponse));
 
    
    mockPreviousRequestsService.getAllRequests(1, 10, false, true, new Date(), new Date(), '200', 'ABC').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, expectedData);
  });

 
  it('should update pageNo and limit and call getRequests', () => {
    // Create a mock function for getRequests
  const mockGetRequests = jest.fn();

  // Set the mock implementation for getRequests
  component.getRequests = mockGetRequests;
    // Create a mock PageEvent
    const event: PageEvent = {
      pageIndex: 2,
      pageSize: 10,
      length: 100
    };
    component.onPageChange(event);
  

    // Assert that pageNo and limit have been updated
    expect(component.pageNo).toBe(event.pageIndex);
    expect(component.limit).toBe(event.pageSize);

    // Assert that getRequests has been called with the updated pageNo and limit
    expect(component.getRequests).toHaveBeenCalledWith(event.pageIndex, event.pageSize);
  });

  it('should reset values and call getRequests', () => {
    const mockGetRequests = jest.fn();

    // Set the mock implementation for getRequests
    component.getRequests = mockGetRequests;
    // Call the closed method
    component.closed();

    // Assert the expected changes or behavior resulting from the closed method
    expect(component.selectedValue).toBeNull();
    expect(component.lastMonth).toBe(false);
    expect(component.lastWeek).toBe(false);
    if (component.requests && component.requests.length > 0) {
      expect(paginator.pageIndex).toBe(0);
    }
    // Assert any other expected changes or behavior resulting from the closed method
  });
  it('should reset values and call getRequests when prevStatus is equal to status', () => {
    const mockGetRequests = jest.fn();

    // Set the mock implementation for getRequests
    component.getRequests = mockGetRequests;
    const status = 'PreviousStatus';
    const matchFound = false;
    const matchNotFound = true;
    const internalError = true;
    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };
    const mockRequests = [{
      requestID: "",
      subjectName: "",
      createdAt: "",
      statusMessage: "",
    }]

    // Call the filterStatus method
    component.filterStatus(status, matchFound, matchNotFound, internalError, event);
    component.requests = mockRequests;

    // Assert the expected changes or behavior resulting from the filterStatus method
    expect(component.status).toBeNull();
    expect(component.prevStatus).toBeNull();
    expect(component.matchFound).toBe(false);
    expect(component.matchNotFound).toBe(false);
    expect(component.internalError).toBe(false);
    expect(component.selectedValueStatus).toBeNull();
    // expect(paginator.pageIndex).toBe(0);
    expect(component.paginator.pageIndex).toBe(0);
    // Assert any other expected changes or behavior resulting from the filterStatus method
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
  it('should fetch request counts and assign the values', () => {
    const mockGetRequestCounts = jest.fn();

    // Assign the mock function to the component's getRequestCounts method
    component.getRequestCounts = mockGetRequestCounts;
    const mockResponse1 = { /* mock response data */ };
    const expectedUrl1 = `${environment.apiUrl}/request/getRequestCounts`
    
    component.getRequestCounts();
    const expectedData1 = {
      avgReqPerDay: '10',
      avgReqPerWeek: '70',
      totalReq: '100',
      totalReqWithSubjectFound: '80',
      totalReqWithMismatch: '20',
      avgReqPerDayvsLastWeek: '5',
      avgReqPerWeekvsLastWeek: '200',
      totalReqvsLastWeek: '50',
      totalReqWithSubjectFoundvsLastWeek:'40',
      totalReqWithMismatchvsLastWeek:'10'

    };
    const observableMock = of(mockResponse1);

// Mock the return value of previousRequestsServiceMock.getAllRequestsCounts to return the mock observable
previousRequestsServiceMock.getAllRequestsCounts = jest.fn().mockReturnValue(observableMock);

// Trigger the method that makes the HTTP request
component.getRequestCounts();


    expect(previousRequestsServiceMock.getRequestCounts).toHaveBeenCalled();
    observableMock.subscribe((response: any) => {
      expect(response).toEqual(mockResponse1);
    expect(component.avgReqPerDay).toBe(10);
    expect(component.avgReqPerWeek).toBe(70);
    expect(component.totalReq).toBe(100);
    expect(component.totalReqWithSubjectFound).toBe(80);
    expect(component.totalReqWithMismatch).toBe(20);
    expect(component.avgReqPerDayvsLastWeek).toBe(5);
    expect(component.avgReqPerWeekvsLastWeek).toBe(35);
    expect(component.totalReqvsLastWeek).toBe(50);
    expect(component.totalReqWithSubjectFoundvsLastWeek).toBe(40);
    expect(component.totalReqWithMismatchvsLastWeek).toBe(10);
  });
  (httpClientMock.get as jest.Mock).mockReturnValue(() => of(mockResponse1));
 
    // Trigger the method that makes the HTTP POST request
    previousRequestsServiceMock.getAllRequestsCounts().subscribe((response:any) => {
      expect(response).toEqual(mockResponse1);
    });
    expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl1,expectedData1); 
  });

 
  
});