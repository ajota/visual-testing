import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDataComponent } from './update-data.component';
import { FormUpdateMobileComponent } from 'src/app/shared/organism/form-update-mobile/form-update-mobile.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { FormUpdateEmailComponent } from 'src/app/shared/organism/form-update-email/form-update-email.component';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateDataComponent', () => {
  let component: UpdateDataComponent;
  let fixture: ComponentFixture<UpdateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '', pathMatch: 'full'}]), HttpClientModule ],
      declarations: [
        ScControlComponent,         FormUpdateEmailComponent,
        FormUpdateMobileComponent,  UpdateDataComponent,
        MapConfigLangPipe,          MapConfigBasePipe
      ],
      providers: [ MapConfigLangPipe ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
