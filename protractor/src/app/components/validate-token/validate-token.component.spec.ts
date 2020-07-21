import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTokenComponent } from './validate-token.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ScValidateTokenComponent } from 'src/app/shared/templates/sc-validate-token/sc-validate-token.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { FormValidateTokenComponent } from 'src/app/shared/organism/form-validate-token/form-validate-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { firebase } from 'src/environments/environment';

describe('ValidateTokenComponent', () => {
  let component: ValidateTokenComponent;
  let fixture: ComponentFixture<ValidateTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path: '', redirectTo: '', pathMatch: 'full'}]),
        AngularFireModule.initializeApp(firebase), AngularFireDatabaseModule
      ],
      declarations: [
        ScControlComponent, FormValidateTokenComponent,
        ScValidateTokenComponent, ValidateTokenComponent,
        MapConfigLangPipe, MapConfigBasePipe
      ],
      providers: [ MapConfigLangPipe, MapConfigBasePipe ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
