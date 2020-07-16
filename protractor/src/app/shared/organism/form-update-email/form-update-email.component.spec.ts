import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEmailComponent } from './form-update-email.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { RouterTestingModule } from '@angular/router/testing';

const MockRoutes = [{path: '', redirectTo: '/', pathMatch: 'full'}];

describe('FormUpdateEmailComponent', () => {
  let component: FormUpdateEmailComponent;
  let fixture: ComponentFixture<FormUpdateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes( MockRoutes ) ],
      declarations: [ ScControlComponent, FormUpdateEmailComponent, MapConfigBasePipe, MapConfigLangPipe ],
      providers: [ MapConfigBasePipe, MapConfigLangPipe ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormUpdateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
