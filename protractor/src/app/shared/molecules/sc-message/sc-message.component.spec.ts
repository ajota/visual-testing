import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScMessageComponent } from './sc-message.component';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { DatePipe } from '@angular/common';

describe('ScMessageComponent', () => {
  let component: ScMessageComponent;
  let fixture: ComponentFixture<ScMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScMessageComponent, MapConfigLangPipe ],
      providers: [ MapConfigLangPipe, DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScMessageComponent);
    component = fixture.componentInstance;
    component.data = {typeQuestion: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
