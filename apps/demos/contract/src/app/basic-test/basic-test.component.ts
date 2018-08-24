import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Block } from '@ngeth/utils/src';
import { Eth } from '@ngeth/provider/src';
import { tap, switchMap } from 'rxjs/operators';
import { Accounts } from '@ngeth/auth/src';
import { AuthWallet } from '@ngeth/auth';
import { EthAccount, Keystore } from '@ngeth/auth/src/lib/account';
import { AuthAccount } from '@ngeth/auth';

@Component({
  selector: 'basic-test',
  templateUrl: './basic-test.component.html',
  styleUrls: ['./basic-test.component.css']
})
export class BasicTestComponent implements OnInit {
  public block$: Observable<Block | string>;
  public account: EthAccount;
  public keystore: Keystore;
  public address: string;

  public nodeAccounts: Observable<string[]>;

  constructor(
    private eth: Eth,
    private acc: Accounts,
    private authAcc: AuthAccount,
    private wallet: AuthWallet
  ) {}

  ngOnInit() {
    this.nodeAccounts = this.authAcc.getAccounts();
  }

  encrypt(pk: string, pwd: string) {
    const account = this.acc.fromPrivate(pk);
    this.address = account.address;
    this.wallet.save(account, pwd);
  }

  create() {
    this.account = this.wallet.create();
    this.address = this.account.address;
  }

  encryptNewAccount() {
    this.wallet.save(this.account, 'motdepasse');
    this.account = null;
  }

  getKeyStore() {
    this.keystore = this.wallet.getKeystore(this.address);
  }

  retrieveKeystore(address: string) {
    this.address = address;
    this.keystore = this.wallet.getKeystore(address);
  }
}

/*
three possibilities :
if localstorage : --> wallet

if none -> wallet, create

if one but no ls -> account, frompk & set localstorage

add : d832b4c06ce8f783ac85f09cac5e7f4660d90001
//
pk : 0xac7ef5e1ec473289343ce567c1f3e1654ed40c0d74b43bb8b812987cdff3fbb5
*/
