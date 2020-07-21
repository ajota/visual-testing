import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraComponent } from './camera.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

describe('CameraComponent', () => {
  let component: CameraComponent;
  let fixture: ComponentFixture<CameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraComponent, MapConfigLangPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
