import { API_RESOURCES } from 'src/app/core/http/api-resources';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  release: 3,
  googleAnalyticsID: 'UA-162216832-1',
  pathConfirmedEmail: '/confirmed-email'
};

export const endpoint = {
  credinet: 'https://api.credinet.co/'
};

export const requestURL = {...API_RESOURCES};

export const externaLinks = {
  downloadAndroidApp: 'https://play.google.com/store/apps/details?id=com.sistecredito.credinet.personas&hl=es_CO'
};

export const headers = {
  SCOrigen: 'Production',
  SCOrigenDeviceType: 'WEB_CUSTOMER',
  'Ocp-Apim-Subscription-Key': '1b222f1dabd149979489a173f1148ea7',
  SCLocation: '0,0',
  country: 'co',
  SCUser: getItemSessionCustomer(name.customer, 'username'),
  SCIdDevice: '0.0.0.0',
  SCPublicIp: '0.0.0.0',
  SCApp: 'false',
  SCVersion: '1.0',
  SCLocalTime: (new Date()).toISOString()
};

export const firebase = {
  apiKey: 'AIzaSyCpVubcyFuho9Zup3lJxcQpWU-F0CbvJT4',
  authDomain: 'credinet2019prod.firebaseapp.com',
  databaseURL: 'https://credinet2019prod.firebaseio.com/',

  projectId: 'credinet2019prod',
  storageBucket: 'credinet2019prod.appspot.com',
  messagingSenderId: '209215258112',
  appId: '1:209215258112:web:d319b1e77f034aee'
};

export const socialLogin = {
  googleClienId: '209215258112-ecrlhb485bv8s183ejm37t6vidps3aa9.apps.googleusercontent.com',
  facebookId: '143986407054405'
};

export const credentialsPaymentGateway = {
  idPagoAgil: '{e57ddd64-a9d2-4975-a66d-1a4691a67110}',
  urlPagoAgil: 'https://www.pagoagil.net/onestep',
  ResponsePagoAgil: 'pagoagil/production/respuestapagoagil',
  mode: '0'//1 dev, 0 prod
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
