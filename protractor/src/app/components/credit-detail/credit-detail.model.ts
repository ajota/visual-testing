export interface Params {
  country: string;
  data: object;
  errorCode: number;
  function: string;
  message: string;
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


export interface Payments {
  storeName: string;
  creditValuePaid: number;
  transactionDate: Date;
  urlReceipt?: string;
}

export interface CreditDetail extends Params {
  data: Details;
}

export interface DetailCalculateCredit extends Params {
  data: CalculateCredit;
}

export interface CalculateCredit {
  minimumPayment: number;
  totalPayment: number;
  arrearsDays: number;
  hasArrears: boolean;
}

export interface StatusCertificate extends Params{
  data: {
    accountStatusFileUrl: string;
  }
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
