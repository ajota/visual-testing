import { NavbarService } from "./navbar.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('NavbaService', () => {

  let service: NavbarService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(NavbarService);
    backend = TestBed.get(HttpTestingController);
  });

  it('Service shoudl init correctly', () => {
    expect(service).toBeTruthy();
  });

  /*it('should Initiate with this public variables', () => {
    if ( app.isMobile ) {
      expect(app.stickyClass).toBe('sc-header--sticky');
    } else {
      expect(app.stickyClass).toBe('');
    }
    expect(app.stickyClassActive).toBeFalsy();
    expect(app.eventLoop).toBeUndefined();
    expect(app.classGenerated).toBeUndefined();
  });

  it( 'when stickyClassActive is false stickyClass should change to  "sc-header--sticky is-active" ', () => {

    expect(app.activateStickyHeader()).toBeUndefined();
    expect(app.stickyClass).toBe('sc-header--sticky');

    spyOn(app, 'setHeightClassHeader');
    app.stickyClassActive = false;
    app.activateStickyHeader();

    expect(app.setHeightClassHeader).toHaveBeenCalled();
    expect(app.stickyClass).toBe('');
  });

  it('removeSicky should change variables to initial value', () => {
    app.stickyClass = 'New Class';
    app.stickyClassActive = true;

    expect(app.stickyClass).toBe('New Class');
    expect(app.stickyClassActive).toBeTruthy();

    expect(app.removeSticky()).toBeUndefined();

    expect(app.stickyClassActive).toBeFalsy();
    expect(app.stickyClass).toBe('');
  });

  it('setEnqueueStyles should automatically change variable to manage the eventLoop', () => {


    expect(app.eventLoop).toBeUndefined();

    expect(app.activateStickyHeader()).toBeUndefined();

    expect(app.eventLoop).toBeDefined();

  });

  it('setHeightClassHeader should create a style Tag on header and change some variables', () => {

    expect(app.setHeightClassHeader()).toBeUndefined();

    expect(app.classGenerated ).toBeTruthy();

  });*/
});
