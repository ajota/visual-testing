import { MapConfigLangPipe } from './map-config-lang.pipe';

const mockConfigLang = {
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

describe('MapConfigLangPipe', () => {

  beforeEach(() => {
    pipe = new MapConfigLangPipe();
    pipe.configLang = mockConfigLang;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
