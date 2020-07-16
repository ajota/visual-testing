import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormJobReferenceComponent } from './form-job-reference.component';
import { AppModule } from 'src/app/app.module';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

describe('FormJobReferenceComponent', () => {
  let component: FormJobReferenceComponent;
  let fixture: ComponentFixture<FormJobReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [MapConfigBasePipe],
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormJobReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with default variables', () => {
    expect(component.listOptions).toBeUndefined();
    expect(component.listCities).toBeUndefined();
    expect(component.cities).toBeUndefined();
    expect(component.ocupationOptions).toBeUndefined();
    expect(component.salaryOptions).toBeUndefined();
    expect(component.roleOptions).toBeUndefined();
    expect(component.availableInput).toBeFalsy();
  })

  it('should exec on submit form', () => {
    component.ocupationOptions = ['Test', 'Options']
    component.roleOptions = [4]
    component.ocupation.setValue(component.ocupationOptions);
    component.role.setValue( component.ocupationOptions);
    component.salary.setValue(1000);
    component.business.setErrors(null);
    component.phone.setValue('00000001');
    component.city.setValue('Admin');
    component.onSubmitForm();
    expect(component.ocupation).toBeUndefined();
    expect(component.salary).toBeUndefined();
    expect(component.business).toBeUndefined();
    expect(component.phone).toBeUndefined();
    expect(component.city).toBeUndefined();
    expect(component.role).toBeUndefined();
  })

  it('should show input form', () => {
    component.ocupationOptions = ['Test', 'Test']
    component.ocupation.setValue(['Test'])
    component.ocupation.setValue(component.ocupationOptions);
    component.showInputForm();
    expect(component.availableInput).toBeFalsy();
  })
});
