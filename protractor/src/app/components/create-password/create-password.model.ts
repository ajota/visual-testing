export interface RequestParams {
  password: string;
  confirmPassword: string;
  paramToken: string;
}


export interface Response {
  function: string;
  errorCode: string;
  message: string;
  country?: any;
  data: any;
}

export interface DataResponse extends Response {
  data: {
    email: string;
    changePassword: boolean;
  };
}

