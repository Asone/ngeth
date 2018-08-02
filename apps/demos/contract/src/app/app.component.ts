import { Eth } from '@ngeth/provider';
import { AuthWallet } from '@ngeth/auth';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { tap, map, switchMap } from 'rxjs/operators';
import { EncoderTestContract } from './contracts/encoder-test/encoder-test.contract';
import { TestEventContract } from './contracts/test-event/test-event.contract';
const bytecode = require('./test-event/bytecode.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';

  constructor(
    private wallet: AuthWallet,
    private encoderTest: EncoderTestContract,
    private testEvent: TestEventContract,
  ) {}

  public deploy() {
    /*
    this.account.getAccounts().pipe(
      map(accounts => accounts[0]),
      tap(account => this.account.defaultAccount = account),
      switchMap(account => this.testEvent.deploy(bytecode.object))
    ).subscribe(tx => console.log('tx deploy', tx));
    */
  }

  ngOnInit() {
    /*
    const pwd = 'toto';
    const account = this.wallet.create();
    console.log(account);
    const keystore = this.wallet.encrypt(account.privateKey, pwd);
    const result = this.wallet.decrypt(keystore, pwd);
    console.log('account', account);
    console.log('result', result);
    this.wallet.save(account, pwd);
    this.wallet.getAccounts().subscribe(console.log);
    */

    //// EVENTS
    /*
    this.testEvent.events.IndexedEventString()
        .subscribe((event) => console.log('IndexedEventString', event));
    this.testEvent.events.IndexedEventUint()
        .subscribe((event) => console.log('IndexedEventUint', event));
    this.testEvent.events.IndexedEventUintString()
        .subscribe((event) => console.log('IndexedEventUintString', event));
    this.testEvent.events.MaxLimitIndexedEvent()
        .subscribe((event) => console.log('MaxLimitIndexedEvent', event));
    this.testEvent.events.NonIndexedEvent()
        .subscribe((event) => console.log('NonIndexedEvent', event));
    this.testEvent.events.NormalAndOnlyStatictStructEvent()
        .subscribe((event) => console.log('NormalAndOnlyStatictStructEvent', event));
    this.testEvent.events.NormalStructEvent()
        .subscribe((event) => console.log('NormalStructEvent', event));
    this.testEvent.events.OnlyStaticStructEvent()
        .subscribe((event) => console.log('OnlyStaticStructEvent', event));
        */
    
  }

}
