import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStatusComponent } from './user-status.component';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { UserStatusService } from './user-status.service';

describe('UserStatusComponent', () => {
  let component: UserStatusComponent;
  let service: UserStatusService;
  let fixture: ComponentFixture<UserStatusComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ MapConfigBasePipe, {provide: ActivatedRoute, useValue: {params: of({}) }} ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserStatusComponent);
    service = TestBed.get(UserStatusService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should initiate this global variables ', () => {
    expect(component.email).toEqual('');
    expect(component.amount).toBeUndefined();
    expect(component.amount).toBeUndefined();
    expect(component.photoWidth).toBeUndefined();
    expect(component.photoHeigth).toBeUndefined();
    expect(component.styleSizePhoto).toEqual('');
    expect(component.idInterval).toBeDefined();
    expect(component.userStatus).toBeUndefined();
    expect(component.totalCount).toEqual(0);
    expect(component.count).toEqual(0);
  });

  it('should executed interval for validation getInfoCustomer', ()=> {
    const spyUserStatus = spyOn(component, 'getInfoCustomer');
    component.count = 0;
    component.totalCount = 0;
    component.userStatus = 1;
    component.customer.amount = 0;
    component.ngOnInit();
    expect(component.totalCount).toEqual(1)

    expect(spyUserStatus).toHaveBeenCalled();
  });

  it('should get info customer', () => {
    component.email = 'email@prueba.spec';
    const customer = service.getInfoCustomer(component.email);
    component.getInfoCustomer();
    expect(customer).toBeDefined();
  });
});
