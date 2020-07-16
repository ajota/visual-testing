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
