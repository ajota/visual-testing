export interface TextBase {
  label: string;
  type: string;
  value: string;
}

export interface DataConfigBase {
  country: string;
  lang: string;
  textBase: [TextBase];
}

export interface GetConfigBase {
  function: string;
  errorCode: number;
  message: string;
  country: string;
  data: [DataConfigBase];
}
