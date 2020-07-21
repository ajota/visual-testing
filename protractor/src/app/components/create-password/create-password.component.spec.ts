import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { FormCreatePasswordComponent } from 'src/app/shared/organism/form-create-password/form-create-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';

const mockChangePass = {
  password: 'myPass123',
  verify_pass: 'myPass123'
};

describe('CreatePasswordComponent', () => {
  let component: CreatePasswordComponent;
  let fixture: ComponentFixture<CreatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePasswordComponent, FormCreatePasswordComponent, ScControlComponent, MapConfigBasePipe, MapConfigLangPipe ],
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'create-password', component: CreatePasswordComponent}])
      ],
      providers: [
        {provide: MapConfigLangPipe, useClass: MapConfigLangPipe },
        {provide: MapConfigBasePipe, useClass: MapConfigBasePipe }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.params = { t: 'Kc6wmFUjRlsmEkyBmciw6oFquwY=' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have params and send to welcome', () => {
    expect(component.sendChangePassword(mockChangePass)).toBe();
  });

  it('Should get params', () => {
    expect(component.hasParams).toBeTruthy();
  });

});
