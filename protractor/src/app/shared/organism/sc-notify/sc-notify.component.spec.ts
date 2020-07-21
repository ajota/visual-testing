import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScNotifyComponent } from './sc-notify.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ScNotifyService } from './sc-notify.service';
import { AppModule } from 'src/app/app.module';
import { NotifyOpts } from './sc-notify.model';
import { of } from 'rxjs';

const MockNotifyOpts = {
  title: 'Titulo de Prueba',
  message: 'Mensaje de prueba',
  icon: 'icon',
  type: 'd',
  onAccept: 'prueba',
};
const MockScNotifySevice = {
  show$: of({}),
  message$: of({}),
  title$: of({}),
  type$: of({}),
  icon$: of({}),
  subtitle$: of({}),
  message2$: of({}),
  icon2$: of({}),
  icon3$: of({}),
  close: () => of(true),
  open: () => of(true)
};

describe('ScNotifyComponent', () => {
  let component: ScNotifyComponent;
  let fixture: ComponentFixture<ScNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [ ScNotifyComponent, {provide: ScNotifyService, useValue: MockScNotifySevice } ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ScNotifyComponent),
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with these variables', () => {
    expect(component.show$).toBeDefined();
    expect(component.message$).toBeDefined();
    expect(component.title$).toBeDefined();
    expect(component.type$).toBeDefined();
    expect(component.icon$).toBeDefined();
    expect(component.btnAcceptName).toEqual('btn_accept');
    expect(component.btnCancelName).toEqual('btn_cancel');
    expect(component.hasAccept).toBeTruthy();
    expect(component.hasCancel).toBeTruthy();
    expect(component.show$).toBeDefined();
  });

  it('Should executed method (Open)', () => {
    let opts: NotifyOpts;
    expect(component.open(opts)).toBeUndefined();
  });

  it('should executed method accepts()', () => {
    expect(component.accept()).toBeUndefined();
  });

});
