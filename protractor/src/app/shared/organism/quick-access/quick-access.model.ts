
export interface ResponseData {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: any;
}

export interface  DataCustomer {
  idDocument: string;
  typeDocument: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  status: number;
  urlPhoto: string;
  amount: number;
  amountAvailable: number;
  arrearsCharge: boolean;
  canRetryRequest: boolean;
}


export interface CustomerInformation extends ResponseData {
  data : {
    customerId: string;
    email: string;
    idDocument: string;
    nextScreen: number;
    phoneNumber: string;
    requestStatus: number;
    typeDocument: string;
  };
  media?: string;
}
export interface NidData {
  nid_type: string;
  nid: string;
  verify_nid: string;
}


export interface Customer {
  data: DataCustomer;
}

export const luegoPago = {
  url: 'https://luegopago.com?',
  paramId: 'ID='
}

export const charDocument = {
  cc: 'CC',
  ce: 'CE'
}
