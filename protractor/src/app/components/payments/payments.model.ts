export interface Params {
  country: string;
  data: object;
  errorCode: number;
  function: string;
  message: string;
}

export interface Payments {
  storeName: string;
  creditValuePaid: number;
  transactionDate: Date;
  urlReceipt?: string;
}

export interface Details {
  storeName: string;
  creditDate: Date;
  creditValue: number;
  minimumPayment: number;
  totalPayment: number;
  dueDate: Date;
  arrearsDays: number;
  statusId: number;
  statusName: string;
  interestRate: number;
  frequency: number;
  fees: number;
  assuranceValue: number;
  downPayment: number;
  feeValue: number;
  assuranceFeeValue: number;
  assuranceTotalFeeValue: number;
  alternatePayment: boolean;
  arrearsCharge: boolean;
  client: string;
  calculationDate: Date;
  balance: number;
  assuranceBalance: number;
  hasArrearsCharge: boolean;
  arrearsCharges: number;
  lastPaymentDate: Date;
  promissoryNoteFileName: string;
  payments: [Payments];
}

export interface CalculateCredit {
  minimumPayment: number;
  totalPayment: number;
  arrearsDays: number;
  hasArrears: boolean;
}

export interface PaymentStatus extends Params {
  data: { isPaymentEnable: boolean };
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
  name: string;
  idDocument: string;
  typeDocument: string;
  valuePaid: number;
}

export interface CreditDetail extends Params {
  data: Details;
}

export interface DetailCalculateCredit extends Params {
  data: CalculateCredit;
}
/** */
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
