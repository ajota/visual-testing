
export interface ResponseData {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: any;
}

export interface Customer extends ResponseData {
  data: DataCustomer;
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
}

export interface CustomerInformation extends ResponseData {
  data: {
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
