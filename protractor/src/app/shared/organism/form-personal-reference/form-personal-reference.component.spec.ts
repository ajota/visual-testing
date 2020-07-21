import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPersonalReferenceComponent } from './form-personal-reference.component';
import { AppModule } from 'src/app/app.module';

describe('FormPersonalReferenceComponent', () => {
  let component: FormPersonalReferenceComponent;
  let fixture: ComponentFixture<FormPersonalReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ AppModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonalReferenceComponent);
    component = fixture.componentInstance;
    component.regFieldsExp = { regName: /.*/, regPhone: /.*/  } ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
