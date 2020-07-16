export interface GenericRequest {
  country: string;
  data: any;
  errorCode: number;
  funaction: string;
  message: string;
}

export interface TokenValidationData extends GenericRequest {
  data: true;
  dataupdate?: string;
}

export interface CustomerInformation extends GenericRequest {
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
