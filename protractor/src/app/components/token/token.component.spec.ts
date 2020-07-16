import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ TokenComponent ],
      providers: [ MapConfigBasePipe ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
