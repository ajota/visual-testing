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
  payments: [Payments];
}

export interface Payments {
  storeName: string;
  creditValuePaid: number;
  transactionDate: Date;
  urlReceipt?: string;
}

export interface DetailCredit extends Params {
  data: Details;
}
