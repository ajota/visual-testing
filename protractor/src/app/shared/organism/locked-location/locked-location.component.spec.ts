import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedLocationComponent } from './locked-location.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestQuotaComponent } from 'src/app/components/request-quota/request-quota.component';

describe('LockedLocationComponent', () => {
  let component: LockedLocationComponent;
  let fixture: ComponentFixture<LockedLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      declarations: [ LockedLocationComponent, MapConfigLangPipe],
    })
    .compileComponents();
    fixture = TestBed.createComponent(LockedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
