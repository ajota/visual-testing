import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDataService {
  SecretKey: string = 'Sistecredito_CrediNet2019*°!)//';

  constructor() {}

  encryptSHA1(data) {
    const encrypt = JSON.stringify(data);
    return CryptoJS.SHA1(encrypt).toString();
  }

}
