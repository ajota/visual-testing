export interface DataRequest {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: any;
}

export interface ResponseConfigLang {
  actions: [];
  currency: string;
  deviceType: string;
  documentTypes: [];
  frequencies: [];
  lang: string;
  locale: string;
  questions: [];
  reasonCreditCancel: [];
  reasonPaymentCancel: [];
  text: [];

}

export interface ConfigByLang extends DataRequest {
  data: ResponseConfigLang;
}

export interface ChangePassword {
  paramToken: string;
  password: string;
  confirmPassword: string;
}
