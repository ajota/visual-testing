import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../core.module';
import { LoadingService } from './loading.service';

describe('LoadingComponent', () => {
  const service: LoadingService = new LoadingService();
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, CoreModule, SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    jasmine.clock().install();
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create and initiate with this parameters', () => {
    expect(component).toBeTruthy();

    expect(component.loadingText$).toBeDefined();
    expect(component.switcher$).toBeDefined();
    expect(component.start).toBeDefined();
    expect(component.end).toBeDefined();

  });

  it('Method start() should change the switcher$ to true', ( done ) => {

    component.switcher$.subscribe( x => {
      expect( x ).toBeTruthy();
      done();
    });

    component.start();

  });

  it('Method end() should change the switcher to false', ( done ) => {

    component.switcher$.subscribe( x => {
      expect( x ).toBeFalsy();
      done();
    });

    component.end();

  });

  it( 'The @input() variable loadindText should change to the default text' , () => {
    let defText = '';

    component.loadingText$.subscribe( x => {
      defText = x;
    });

    component.start();
    jasmine.clock().tick( 500 );
    expect( defText ).toEqual( service.defaultText );
  });

});
