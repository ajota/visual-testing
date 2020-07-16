import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScTypeaheadComponent } from './sc-typeahead.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgBootstrapModule } from 'src/app/ng-bootstrap.module';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

describe('ScTypeaheadComponent', () => {
  let component: ScTypeaheadComponent;
  let fixture: ComponentFixture<ScTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NgBootstrapModule],
      declarations: [ ScTypeaheadComponent, MapConfigLangPipe, MapConfigBasePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
