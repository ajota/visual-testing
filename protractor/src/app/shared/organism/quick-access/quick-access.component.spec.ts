import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccessComponent } from './quick-access.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PassDataService } from '../../util/pass-data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const MockCustomerInformation = {
    idDocument: '123456',
    typeDocument: 'CC',
    firstName: 'Test',
    secondName: 'Test',
    firstLastName: 'Prueba',
    secondLastName: 'Prueba',
    status: 1,
    urlPhoto: 'url/prueba/testing',
    amount: 5000,
    amountAvailable: 45000,
    arrearsCharge: false,
    canRetryRequest: true,
  
};

class MockPassDataService {
  getData() {
    return {data: MockCustomerInformation};
  }
}

describe('QuickAccessComponent', () => {
  let component: QuickAccessComponent;
  let fixture: ComponentFixture<QuickAccessComponent>;
  let passDataService: PassDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterModule, HttpClientTestingModule ],
      declarations: [ QuickAccessComponent, MapConfigLangPipe ],
      providers: [PassDataService,   
        {provide: PassDataService, useClass: MockPassDataService}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(QuickAccessComponent);
    component = fixture.componentInstance;
    component.customerData = MockCustomerInformation;
    passDataService = TestBed.get(PassDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with default data', () => {
    expect(component.customerStatus).toBeUndefined();
    expect(component.customerData).toBeDefined();
    expect(component.urlAction).toBeUndefined();
    expect(component.env).toBeDefined();
    expect(component.tooltipOpen).toBeTruthy();
    expect(component.retryRequest).toBeFalsy();
    expect(component.idInterval).toBeDefined();
    expect(component.userStatus).toBeUndefined();
    expect(component.count).toEqual(0);
    expect(component.totalCount).toEqual(0);
  });
  
  it('should exec interval', () => {
    component.executedInterval();
  });

  it('should exec interval flow else', () => {
    component.customerData = MockCustomerInformation 
    component.executedInterval();
    expect(component.customerStatus).toBeDefined();
  });

  it('should exec get retry request', () => {
    component.customerStatus = 4;
    component.getRetryRequest();
    expect(component.customerStatus).toBeDefined();
  });

  it('should exec setRedirec action', () => {
    component.customerStatus = 1;
    component.setRedirectAction();
  })

  it('should exec close and return false', () => {
    component.close();
    expect(component.tooltipOpen).toBeFalsy();
  })
});
