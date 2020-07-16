import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerComponent } from './location-picker.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { NgBootstrapModule } from 'src/app/ng-bootstrap.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationPickerComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgBootstrapModule, HttpClientTestingModule ],
      declarations: [ LocationPickerComponent, ScControlComponent, MapConfigLangPipe, MapConfigBasePipe ],
      providers: [ MapConfigLangPipe, MapConfigBasePipe ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
