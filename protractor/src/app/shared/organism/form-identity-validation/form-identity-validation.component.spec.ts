import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { FormIdentityValidationComponent } from './form-identity-validation.component';
import { CommonModule } from '@angular/common';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormIdentityValidationComponent', () => {
  let component: FormIdentityValidationComponent;
  let fixture: ComponentFixture<FormIdentityValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ FormIdentityValidationComponent, MapConfigLangPipe ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIdentityValidationComponent);
    component = fixture.componentInstance;
    component.controls = [{label: '', value: '' }]
    fixture.detectChanges();
  });

  it('should create and initiate componenet Form identity validation', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

});
