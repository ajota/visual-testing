export interface Params {
  country: string;
  data: any | [any];
  errorCode: number;
  function: string;
  message: string;

}

export interface  DataCustomer {
  email?: string;
  mobile?: number;
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
  ArrearsCharge: boolean;
  canRetryRequest: boolean;
}

export interface ActiveCredit {
  creditId: string;
  storeName: string;
  creditValue: string;
  dueDate: Date;
  alternatePayment: boolean;
  arrearsCharge: boolean;
}

export interface HistoryCredit {
  creditId: string;
  storeName: string;
  creditValue: number;
  status: number;
}

export interface Customer extends Params {
  data: DataCustomer;
}

export interface CustomerCredits extends Params {
  data: [ActiveCredit];
}

export interface CustomerHistoryCredits extends Params {
  data: [HistoryCredit];
}

