export interface DataCustomerParams {
  _id?: string;
  defaultStore: string;
  defaultLevelConfigName: string;
  defaultScStoreId: string;
  defaultScUserStoreId: string;
  defaultUserId: string;
}
export interface CustomerRequestById {
  amount: number;
  amountAvailable: number;
  debtor: boolean;
  fullName: string;
  idDocument: string;
  status: number;
  typeDocument: string;
  urlPhoto: string;
}

export interface DataRequestById {
  customer: CustomerRequestById;
  percetage: number;
  status: number;
  statusReason: string;
  storeId: string;
  updateDate: Date;
  _id: string;
}
export interface GetCustomerParams {
  country: string;
  data: DataCustomerParams;
  errorCode: number;
  funaction: string;
  message: string;
}

export interface GetRequestById {
  idDocument: string;
  levelConfigName: string;
  lang: string;
  storeId: string;
  typeDocument: string;
}

export interface ResponseRules{
  placeholder?: string;
  type?: string;
  expression?: RegExp;
  message?: string;
}

export class Validator {
  expression: RegExp;
  message: string;
}

export class Property {
  property: string;
  value: string;
}

export class Question {
  _id: string;
  name: string;
  editable: boolean;
  textQuest: string;
  type: string;
  optional: boolean;
  validator: Validator;
  properties: Property[];
}
export class Message {
  id: string;
  message: string;
  name: string;
  sendMessage: boolean;
  typeQuestion: string;
  question: Question;
  status: boolean;
  isLast: boolean;
  storeId: string;
  type: string;
  constructor() {}
}

export class Chat {
  messages: Message[];
}

export interface ActionResponse {
  type: string;
  action: any;
}

export interface Response {
  function: string;
  errorCode: number;
  message: string;
  country?: string;
  data: any;
}
export interface City {
  name: string;
  departament: string;
}

export interface Cities extends Response {
  data: {locations: [City]};
}
