export interface DataRequest {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: any;
}

export interface GeneralDataStructure {
  label: string;
  type: string;
  value: string;
}

export interface ConfigBaseResponse  {
  country: string;
  lang: string;
  deviceType: string;
  appVersion: string;
  updateAppUrl: string;
  textBase: [ GeneralDataStructure ];
}

export interface CentersAuthorizationTextResponse extends DataRequest {
  data: ConfigBaseResponse;
}

export interface ChangePasswordResponse extends DataRequest{
  data: {
    email: string;
    changedPassword: boolean;
  };
}

export interface VerifyEmailRequest {
  paramToken: string;
}

export interface VerifyEmailResponse extends  DataRequest{
  data: boolean ;
}

export interface CentersAuthorization {
  paramToken: string;
  authorize: boolean;
}

export interface CentersAuthorizationResponse extends DataRequest {
  data: boolean;
}

export interface VerifyAccountRequest extends VerifyEmailRequest{
  password?: string;
  confirmPassword?: string;
  t?: string;
}
