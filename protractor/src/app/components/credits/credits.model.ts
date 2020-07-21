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
  address?: string;
  department?: string;
  city?: string;
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
}

export interface ActiveCredit {
  creditId?: string;
  storeName: string;
  creditValue: string;
  dueDate: Date;
  alternatePayment: boolean;
  hasArrearsCharge: boolean;
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
  data: {activeCredits: ActiveCredit[] };
}

export interface CustomerHistoryCredits extends Params {
  data: {creditHistory: HistoryCredit[]};
}


