import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BridgePayComponent } from './bridge-pay.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('BridgePayComponent', () => {
  let component: BridgePayComponent;
  let fixture: ComponentFixture<BridgePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{ path: '',redirectTo: '', pathMatch: 'full' }]) ],
      declarations: [ BridgePayComponent, MapConfigBasePipe ],
      providers: [MapConfigBasePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
