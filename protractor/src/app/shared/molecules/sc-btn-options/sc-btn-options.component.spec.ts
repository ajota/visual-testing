import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScBtnOptionsComponent } from './sc-btn-options.component';

describe('ScBtnOptionsComponent', () => {
  let component: ScBtnOptionsComponent;
  let fixture: ComponentFixture<ScBtnOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScBtnOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScBtnOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
