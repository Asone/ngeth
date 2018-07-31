import { Observable } from 'rxjs';
import { TxObject } from '@ngeth/utils';

export interface Auth {
  account$: Observable<string>;
  defaultAccount: string;
  getAccounts(): Observable<string[]>;
  sendTransaction(tx: TxObject, ...rest: any[]): Observable<string>;
  sign(message: string, address: string, password: string);
}
