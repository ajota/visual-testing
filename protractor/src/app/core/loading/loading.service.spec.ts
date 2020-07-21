import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Should be created', () => {
    const service: LoadingService = TestBed.get(LoadingService);
    expect(service).toBeTruthy();
  });

  it('Should initiate with the respective default values and methods', () => {

    const service: LoadingService = TestBed.get(LoadingService);

    expect(service.defaultText).toBeDefined();
    expect(service.switcher$).toBeDefined();
    expect(service.text$).toBeDefined();
    expect(service.start).toBeDefined();
    expect(service.end).toBeDefined();
    expect(service.isStarted).toBeDefined();
    expect(service.hasText).toBeDefined();

  });

  it('Variable default text should initiate with a specific text', () => {

    const service: LoadingService = TestBed.get(LoadingService);
    expect(service.defaultText).toEqual( 'Espere por favor...' );

  });

  it('Method start() should change the variable switcher to true', ( done: DoneFn ) => {

    const service: LoadingService = TestBed.get(LoadingService);

    service.switcher$.subscribe( ( x ) => {
      expect(x).toBeTruthy();
      done();
    });

    service.start();

  });

  it('Method end() should change the variable switcher to false', ( done: DoneFn) => {

    const service: LoadingService = TestBed.get(LoadingService);

    service.switcher$.subscribe( ( x ) => {
      expect(x).toBeFalsy();
      done();
    });

    service.end();

  });

  it('Method isStarted() should return the an Observable in true value', ( ) => {

    const service: LoadingService = TestBed.get(LoadingService);

    expect( service.isStarted() ).toBeFalsy();

  });

  it('Method hasText() should return the a string with the default string text', ( ) => {

    const service: LoadingService = TestBed.get(LoadingService);

    expect( service.hasText() ).toEqual( service.defaultText );

  });

  it('Method changeText() should return the a string with the default string text and change the text$ variable to the new text',
    ( done: DoneFn ) => {

      const service: LoadingService = TestBed.get(LoadingService);

      const customText = 'Texto nuevo de prueba';

      service.text$.subscribe( ( text ) => {
        expect( text ).toEqual( customText );
        done();
      });

      expect( service.changeText( customText ) ).toEqual( customText );

    }
  );

});
