import { SocialUser } from 'angularx-social-login';

export interface UserLogin extends Object {
  username: string;
  password: string;
  token?: string;
  client_id?: string;
}


export interface UserLoginResp {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export class UserExternalLogin extends SocialUser {
  client_id?: string;
  provider: string;
}
export interface RequestLogin {
  country?: string;
  data: [Array<any>];
  errorCode: number;
  funciton: string;
  message: string;
}


export interface CustomerValid {
  email: string;
}

export interface SessionNotification {
  clientId: string;
  count: number;
  email: string;
  time: string;
}

export interface ExternalLogin {
  provider: string;
  external_token: string;
  client_id?: string | null;
}

