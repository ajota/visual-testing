
export interface ResponseData {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: any;
}

export interface StoreParams {
  _id?: string;
  defaultStore: string;
  defaultLevelConfigName: string;
  defaultScStoreId: string;
  defaultScUserStoreId: string;
  defaultUserId: string;
}

export interface StoreInformation extends ResponseData {
  data: StoreParams;
}

export interface Customer {
  fullName: string;
  urlPhoto: string;
  idDocument: string;
  amount: number;
  amountAvailable: number;
  status: number;
  debtor: boolean;
  typeDocument: string;
  email: string;
  mobile: string;
  verifiedEmail: boolean;
}

export interface CustomerRequestInformation extends ResponseData {
  data: {
    request: {
      _id: string;
      percentage: number;
      status: number;
      updateDate: Date;
      storeId: string;
      statusReason?: any;
      customer: {
        fullName: string;
        urlPhoto: string;
        idDocument: string;
        amount: number;
        amountAvailable: number;
        status: number;
        debtor: boolean;
        typeDocument: string;
        email: string;
        mobile: string;
        verifiedEmail: boolean;
      };
    };
    nextScreen: number;
  };
  media?: string;
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

export interface CustomerByNidAndNidType extends ResponseData{
  data: {
    customerId: string;
    idDocument: string;
    typeDocument: string;
    requestStatus: number;
    nextScreen: number;
  };
}

export interface ComunicationControls {
  media: string;
  value: string;
  label: string;
}

export interface NidData {
  nid_type: string;
  nid: string;
  verify_nid: string;
}
