export const steps = {
  search: 'search',
  result: 'resultCredits',
  payment: 'formPayment',
  zonaVirtual: 'zonaVirtual'
};

export interface User {
  idDocument: string;
  typeDocument: string;
  validationCode: string;
}

export interface Payments {
  storeName: string;
  creditValuePaid: number;
  transactionDate: Date;
  urlReceipt?: string;
}

export interface Params {
  country: string;
  data: object;
  errorCode: number;
  function: string;
  message: string;
}


export interface ActiveCredits {
  name: string;
  idDocument: string;
  typeDocument: string;
  credits: [];
}

export interface CreditsQuickPayment extends Params  {
  data: { credits: [ActiveCredits] };
}

export interface ProcessPayment extends Params {
  data: { url: string };
}


export interface CreditInfo {
  creditId: string;
  idDocument: string;
  typeDocument: string;
}

export interface CreditToPay {
  creditId: string;
  idDocument: string;
  valuePaid: number;
}

export interface Customer {
  typeDocument: string;
  idDocument: string;
  urlPhoto: string;
  fullName: string;
  scCodigo: string;
  movileNumber: string;
  email: string;
}
export interface InfoCustomer extends Params {
  data: Customer;
}

export const type = {
  info: 'info',
  success: 'success',
  error: 'error'
};

export const icon = {
  info: 'sc-icon--notify-info',
  success: 'sc-icon--notify-success',
  error: '--notify-error'
};

export const paidMethods = {
  undefined: -1,
  pse: 29,
  tarjetaCredito: 32,
  pdfZonaPagos: 41,
  gana: 42,
  tarjetaTuya: 45
};

export const payStatus = {
  approved: 1,
  pendingStart: 888,
  pendingEnd: 999,
  pendingCR: 4001,
  deniedCR: 4000,
  errorCR: 4003,
  denied: 1000,
  errorPSE: 1001
};

export interface Payment {
  creditId: string;
  idDocument: string;
  email: string;
  transactionStatus: number;
  transactionDate: string;
  idPayment: number;
  valuePaid: number;
  methodPayment: number;
  messageStatusPayment: string;
}

export interface InfoPayment extends Params {
  data: Payment;
}
