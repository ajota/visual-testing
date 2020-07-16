import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginComponent } from './form-login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ FormLoginComponent, ScControlComponent, MapConfigBasePipe, MapConfigLangPipe ],
      providers: [ MapConfigLangPipe, MapConfigBasePipe ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate fileds and submit form', () => {
    component.username.setValue('usuarioprueba@mail.com');
    component.password.setValue('asdasd');
    expect(component.formLogin.valid).toBeFalsy();
    component.onSubmitLogin();
  });
});
