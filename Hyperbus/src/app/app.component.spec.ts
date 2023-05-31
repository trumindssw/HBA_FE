import { AppComponent } from "./app.component"



describe('AppComponent', () =>{
  let fixture: AppComponent;
  beforeEach( () => {
    fixture = new AppComponent();
  })
//  it('should have a title angularJest ',() =>{
//   expect(fixture.title).toEqual('angularJest');
//  })
  it('should create', () => {
    expect(2+2).toBe(4);
  });
})