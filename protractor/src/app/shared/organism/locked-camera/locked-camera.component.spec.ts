import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LockedCameraComponent } from './locked-camera.component';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { nameRoutes } from '../../util/name-routes';


describe('LockedCameraComponent', () => {
  let component: LockedCameraComponent;
  let fixture: ComponentFixture<LockedCameraComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LockedCameraComponent),
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    return {fixture};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should start with these variables by default', () => {
  //   expect(component.status).toBeUndefined();
  // });

  it('should get navigators permission case denied',   () => {
    // component.status = 'denied';
    const navigateSpy = spyOn(router, 'navigate');
    expect(navigateSpy).toHaveBeenCalledWith([nameRoutes.lockedCamera]);
  });

  it('should get navigators permission case different to denied',  () => {
    // component.status = 'granted';
    const navigateSpy = spyOn(router, 'navigate');
    expect(navigateSpy).toHaveBeenCalledWith([nameRoutes.lockedCamera]);
  });
});
