import { permissions } from './name-storage';

export function saveSessionLocalStorage(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}

export function getSessionLocalStorage(name: string) {
  if (sessionStorage.getItem(name)) {
    return JSON.parse(sessionStorage.getItem(name)).data[0];
  } else {
    return { textBase: [] };
  }
}

export function getSessionLangStorage( name: string ) {
  if (sessionStorage.getItem(name)) {
    return JSON.parse(sessionStorage.getItem(name)).data;
  } else {
    return { text: [] };
  }
}

export function saveSessionCustomer( name: string, params: object ) {
  let data = JSON.parse(sessionStorage.getItem(name));

  if (data !== null) {
    data = Object.assign(data, params);
    sessionStorage.setItem(name, JSON.stringify(data));
  } else {
    sessionStorage.setItem(name, JSON.stringify(params));
  }
}

export function removeItemSessionCustomer( dataKey: string[] | string ) {
    const userSessionCustomer = getDataSessionCustomer('customer');
    const keys = typeof dataKey === 'string' ? [dataKey] : dataKey ;

    keys.forEach( key => {
      if ( userSessionCustomer[key] ) {
        delete userSessionCustomer[key];
      }
    });
    saveSessionLocalStorage('customer', userSessionCustomer);
}

export function getItemSessionCustomer( name, keyObject ) {
  const data = JSON.parse(sessionStorage.getItem(name));
  return data && data[keyObject] || '';
}

export function getDataSessionCustomer( name ) {
  const data = JSON.parse(sessionStorage.getItem(name));
  return data || {};
}

export function getDataSessionStore( name ) {
  const data = JSON.parse(sessionStorage.getItem(name));
  return data || {};
}


export function getDevicesPermissions( device: PermissionName ): Promise<any> {
  const permissionsApi = navigator.permissions;
  if (permissionsApi) {
    return navigator.permissions.query({ name: device});
  } else {
    return new Promise( (result, rejection) => {
      return result({state: permissions.granted})
    })
  }
}

export function getEnabledButtonPayment() {
  if (sessionStorage.getItem('configBaseStorage')) {
    return JSON.parse(sessionStorage.getItem('configBaseStorage')).data[0].enableButtonPayment;
  } else {
    return false;
  }
}

export function getDomains(){
  if(sessionStorage.getItem('configBaseStorage')) {
    return JSON.parse(sessionStorage.getItem('configBaseStorage')).data[0].domains;
  }
}
