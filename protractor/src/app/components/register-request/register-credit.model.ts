export interface GenericRequest {
  country: string;
  data: any;
  errorCode: number;
  function: string;
  message: string;
}
// Nid: Nomero identificacion documento
export interface NidData {
  verify_nid: string;
  nid_type: string;
  nid: string;
}

export interface DataStoreParams {
  _id?: string;
  defaultStore: string;
  defaultLevelConfigName: string;
  defaultScStoreId: string;
  defaultScUserStoreId: string;
  defaultUserId: string;
}

export interface  GetStoreParams extends GenericRequest{
  data: DataStoreParams;
}

export interface CustomerInformation extends GenericRequest{
  data: {
    customerId: string;
    email: string;
    idDocument: string;
    nextScreen: number;
    phoneNumber: string;
    requestStatus: number;
    typeDocument: string;
  };
}
