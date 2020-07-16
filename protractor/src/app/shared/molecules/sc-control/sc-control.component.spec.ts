import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScControlComponent } from './sc-control.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

describe('ScControlComponent', () => {
  let component: ScControlComponent;
  let fixture: ComponentFixture<ScControlComponent>;

  beforeEach(() => {
    let component: ScControlComponent;
    let fixture: ComponentFixture<ScControlComponent>;
    TestBed.configureTestingModule({
      imports: [ CommonModule, ReactiveFormsModule],
      declarations: [ ScControlComponent,
         MapConfigBasePipe, MapConfigLangPipe ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ScControlComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({ name: new FormControl('', Validators.required) });
    component.name = 'name' ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with default variables', () => {
    expect(component.type).toEqual(undefined);
    expect(component.name).toEqual(undefined);
    expect(component.label).toEqual(undefined);
    expect(component.form).toEqual(undefined);
    expect(component.ricon).toEqual(undefined);
    expect(component.licon).toEqual(undefined);
    expect(component.theme).toEqual(undefined);
    expect(component.placeholder).toEqual(undefined);
    expect(component.riconClick).toEqual(false);
    expect(component.riconInitClass).toEqual(undefined);
    expect(component.riconInitType).toEqual(component.type);
    expect(component.messagesValidation).toEqual(undefined);
    expect(component.userEmail).toEqual(undefined)
  });


  it('should exec riconActionClick ', () => {
    component.riconInitType  = 'passwordlogin'
    component.riconClick = false;
    component.ngOnInit();
    expect(component.ricon).toEqual('sc-icon--password-hide');
    expect(component.type).toEqual('text');
    expect(component.riconClick).toEqual(true);

    component.riconInitType = 'password'
    component.riconClick = true;
    expect(component.ricon).toEqual(undefined);
    expect(component.type).toEqual(undefined);
    expect(component.riconClick).toEqual(false);
  });
});
