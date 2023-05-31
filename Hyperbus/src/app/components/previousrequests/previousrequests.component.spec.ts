// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { PreviousrequestsComponent } from './previousrequests.component';
// // import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';
// import { Router } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { of } from 'rxjs';
// import { MatMenuModule } from '@angular/material/menu';
//
// import { PreviousRequestsService } from '../../_services/previousrequests/previousrequests.service';

// const mockTablClickAPI = {
//   "status": 1,
//   "message": "Detail of the request",
//   "data": {
//       "message": "Request is...",
//       "data": [
//           {
//               "key": "Moc Request ID",
//               "value": "Mock_IA152AA0653",
//               "checked": 1
//           }
//       ]
//   }
// }

// class matDialogMock {
//   open = jest.fn();
//   // .mockReturnValue({
//   //   afterClosed: jest.fn().mockReturnValue(of(true)),
//   // }),
// };

// class MatDialogMock {
//   open = jest.fn(() => ({
//     afterClosed: () => ({
//       subscribe: jest.fn(),
//     }),
//   }));
// }

// describe('PreviousrequestsComponent', () => {
//   let component: PreviousrequestsComponent;
//   let fixture: ComponentFixture<PreviousrequestsComponent>;
//   let router : Router;
//   let dialog: MatDialog;
//  let PreviousRequestsService: PreviousRequestsService;
// //  class MatDialogMock {
// //   open() {
// //     return {
// //       afterClosed() {
// //         return of(true);
// //       },
// //     };
// //   }
// // }

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,MatMenuModule],
//       declarations: [ PreviousrequestsComponent ],
//       providers: [
//         { provide: MatDialog, useClass: MatDialogMock },
//       ],
//     })
//     .compileComponents();
//   });
//   beforeEach(() => {
//     TestBed.inject(HttpClientTestingModule);
//     dialog = TestBed.inject(MatDialog);
//     component = TestBed.createComponent(PreviousrequestsComponent).componentInstance;
//   });
//   // beforeEach(async () => {
//   //   await TestBed.configureTestingModule({
//   //     declarations: [PreviousrequestsComponent],
//   //   }).compileComponents();
//   // });
//     beforeEach(() =>{
//     fixture = TestBed.createComponent(PreviousrequestsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   beforeEach(() => {
//     dialog = matDialogMock as unknown as MatDialog;
//     // component = new YourComponent(dialog);
//   });
//   /*
//   it('should open dialog and subscribe to afterClosed', () => {
//     // const reqId = 'yourReqId';
//     // const event = { target: { style: { color: '' } } };
//     const reqId = 'yourReqId';
//     const event = { target: { style: { color: '' } } };
//     const mockMatDialog = new MatDialogMock();
//     component.openDialog(reqId, event);
//     const spy = jest.spyOn(mockMatDialog, 'open').mockReturnValue({
//       afterClosed() {
//         return of(true);
//       },
//     } as any);
//     console.log('spy==============', spy)

//     // component.openDialog(reqId, event);

//     // expect(spy).toHaveBeenCalledWith(RequestdetailsComponent, {
//     //   data: { name: reqId },
//     // });
//     // it('should open the dialog', () => {

//       expect(mockMatDialog.open).toHaveBeenCalled();
//       // expect(dialogRef.afterClosed).toHaveBeenCalled();
//     // });
//   });
//   */

//   // it('should get request details', () => {
//   //   const reqId = 'yourReqId';
//   //   const response = { data: { data: 'yourResponseData' } };
//   //   const getRequestDetailsSpy = jest.spyOn(
//   //     component.RequestDetailsServices,
//   //     'getRequestdetails'
//   //   ).mockReturnValue(of(response));

//   //   component.getRequestDetails(reqId);

//   //   expect(getRequestDetailsSpy).toHaveBeenCalledWith(reqId);
//   //   expect(component.result).toEqual(response.data.data);
//   // });

//   // it('should be verified', () => {
//   //   // expect(component).toBeTruthy();
//   //   let ab = new PreviousrequestsComponent(router,PreviousRequestsService,dialog)
//   //   let isTrue = ab.isVerified('verified')
//   //   expect(isTrue).toBeTruthy();
//   // });

//   // it('should display the previous requests screen when "Show Previous Requests" button is pressed', () => {
//   //   // Simulate button click
//   //   const button = fixture.debugElement.query(By.css('.show-requests-button'));
//   //   button.triggerEventHandler('click', null);
//   //   fixture.detectChanges();

//   //   // Verify that the previous requests screen is displayed
//   //   const previousRequestsScreen = fixture.debugElement.query(By.css('.previous-requests-screen'));
//   //   expect(previousRequestsScreen).toBeTruthy();
//   // });

//   // it('should hide the previous requests screen initially', () => {
//   //   // Verify that the previous requests screen is hidden
//   //   const previousRequestsScreen = fixture.debugElement.query(By.css('.previous-requests-screen'));
//   //   expect(previousRequestsScreen).toBeFalsy();
//   // });

//   // it('should hide the previous requests screen when "Close" button is clicked', () => {
//   //   // Simulate button click to show the previous requests screen
//   //   const showRequestsButton = fixture.debugElement.query(By.css('.show-requests-button'));
//   //   showRequestsButton.triggerEventHandler('click', null);
//   //   fixture.detectChanges();

//   //   // Simulate button click on the "Close" button
//   //   const closeButton = fixture.debugElement.query(By.css('.close-button'));
//   //   closeButton.triggerEventHandler('click', null);
//   //   fixture.detectChanges();

//   //   // Verify that the previous requests screen is hidden
//   //   const previousRequestsScreen = fixture.debugElement.query(By.css('.previous-requests-screen'));
//   //   expect(previousRequestsScreen).toBeFalsy();
//   // });

//   it('should open the dialog', () => {
//     const matDialogMock = new MatDialogMock();
//     // const component = new RequestdetailsComponent(matDialogMock);
//     component.openDialog('reqId', { target: { style: { color: 'violet' } } });
//     expect(matDialogMock.open).toHaveBeenCalledWith(RequestdetailsComponent, { data: { name: 'reqId' }, });
//     expect(matDialogMock.open().afterClosed().subscribe).toHaveBeenCalled(); });

// });

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { RequestdetailsService } from '../../_services/requestdetails/requestdetails.service';
import { PreviousrequestsComponent } from './previousrequests.component';
import { Router } from '@angular/router';
import { PreviousRequestsService } from '../../_services/previousrequests/previousrequests.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const expectedUrl = `${environment.apiUrl}/request/getRequestDetail` //'/api/requests';
    
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
 
    // Trigger the method that makes the HTTP POST request
    mockPreviousRequestsService.getAllRequests(1, 10, false, true, new Date(), new Date(), '200', 'ABC').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, expectedData);
  });
});
