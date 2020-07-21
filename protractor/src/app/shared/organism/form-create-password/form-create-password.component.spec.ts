import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePasswordComponent } from './form-create-password.component';
import { AppModule } from 'src/app/app.module';

describe('FormCreatePasswordComponent', () => {
  let component: FormCreatePasswordComponent;
  let fixture: ComponentFixture<FormCreatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
