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

export interface Cities extends Response{
  data: {locations: [City]};
}

export interface Neighborhoods extends Response {
  data: {neighborhoods: [string]};
}
