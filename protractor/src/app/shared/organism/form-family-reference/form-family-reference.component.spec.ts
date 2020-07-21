import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFamilyReferenceComponent } from './form-family-reference.component';
import { AppModule } from 'src/app/app.module';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

describe('FormFamilyReferenceComponent', () => {
  let component: FormFamilyReferenceComponent;
  let fixture: ComponentFixture<FormFamilyReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [MapConfigBasePipe],
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormFamilyReferenceComponent);
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
    expect(component.selectOptions).toEqual([]);
  })

  it('should exec on submit', () => {
    component.onSubmitForm();
    expect(component.relationship.value).toBeUndefined();

  })


  it('should get all values form', () => {
    component.name.setValue('Prueba');
    component.phone.setValue('00000001');
    component.city.setValue('Mede');
    component.relationship.setValue('relationship')
  })
});
