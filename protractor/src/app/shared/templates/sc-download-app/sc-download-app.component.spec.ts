import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScDownloadAppComponent } from './sc-download-app.component';
import { ScModalComponent } from '../../molecules/sc-modal/sc-modal.component';

describe('ScDownloadAppComponent', () => {
  let component: ScDownloadAppComponent;
  let fixture: ComponentFixture<ScDownloadAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScModalComponent, ScDownloadAppComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ScDownloadAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
