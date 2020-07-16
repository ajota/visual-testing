import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { ScModalComponent } from '../../molecules/sc-modal/sc-modal.component';


const MockCustomerData = {
  idDocument: 'string',
  typeDocument: 'string',
  firstName: 'string',
  secondName: 'string',
  firstLastName: 'string',
  secondLastName: 'string',
  status: 0,
  urlPhoto: 'string',
  amount: 0,
  amountAvailable: 0,
  arrearsCharge: true
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full' }]) ],
      declarations: [ ScModalComponent, NavbarComponent, MapConfigLangPipe ],
      providers: [ MapConfigBasePipe, MapConfigLangPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.customer = MockCustomerData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
