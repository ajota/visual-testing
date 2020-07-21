import { TextBase } from './config-base';

export interface ConfigByLang {
    country: string;
    data: DataConfigByLang;
    message: string;
    errorCode: number;
    function: string;
}

export interface DataConfigByLang {
    lang: string;
    questions: Array<string>;
    text: Array<TextBase>;
    deviceType: string;
    actions: any;
}
