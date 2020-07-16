import { MapConfigBasePipe } from './map-config-base.pipe';
const mockConfigBase = {
  textBase: [
    { label: 'exit', type: 'text', value: 'Salir' },
    { label: 'lbl_welcome_title', type: 'text', value: '¡Bienvenido!' },
    {
      label: 'lbl_company_title',
      type: 'text',
      value: 'Siste<b>crédito</b>'
    },
    {
      label: 'lbl_welcome_subtitle',
      type: 'text',
      value: 'Ingresa y haz posible lo que sueñas'
    }
  ]
};

let pipe;

describe('MapLanguagePipe', () => {
  beforeEach(() => {
    pipe = new MapConfigBasePipe();
    pipe.configBase = mockConfigBase;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
