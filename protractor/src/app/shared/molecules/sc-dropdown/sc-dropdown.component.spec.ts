import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScDropdownComponent } from './sc-dropdown.component';

describe('ScDropdownComponent', () => {
  let component: ScDropdownComponent;
  let fixture: ComponentFixture<ScDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
