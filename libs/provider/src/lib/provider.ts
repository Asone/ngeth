import { WebsocketProvider } from './ws-provider';
import { HttpClient } from '@angular/common/http';
import { bindNodeCallback, Observable } from 'rxjs';

import { RPCRes, RPCReq, RPCSub } from '@ngeth/utils';
import { MainProvider } from './main-provider';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Provider extends MainProvider {
  public sendAsync: <T>(payload: RPCReq) => Observable<RPCRes<T>>;
  public on: <T>(payload: RPCReq) => Observable<RPCSub<T>>;

  constructor(public http: HttpClient, public ws: WebsocketProvider) {
    super();
  }

  /**
   * Initialize the provider with the url thenfetch the Id of the network
   * @param url The url of the node to connect with
   * @param currentProvider use your current Provider. If none, use the url
   */
  public init(url: string, currentProvider : boolean = false): Promise<number> {
    this.url = url || 'localhost:8545';
    const protocol = new URL(this.url).protocol;
    const isWS = protocol === 'ws:' || protocol === 'wss:';

    if (window && 'web3' in window && currentProvider) {
      this.type = 'web3';
      this.setWeb3Provider();
    } else if (isWS) {
      this.type = 'ws';
      this.setWsProvider();
    } else {
      this.type = 'http';
      this.setHttpProvider();
    }
    return this.fetchId().then(id => this.id = parseInt(id, 10));
  }

  /** Connect to a web3 instance inside the page if any */
  private setWeb3Provider() {
    this.web3Provider = window['web3'].currentProvider;
    this.sendAsync = payload => {
      const sendAsync = this.web3Provider.sendAsync.bind(
        this.web3Provider,
        payload
      );
      return bindNodeCallback<any>(sendAsync)();
    };
  }

  /** Setup a Websocket connection with the node */
  private setWsProvider() {
    this.ws.create(this.url);
    this.on = payload => {
      this.rpcId++;
      return this.ws.subscribe(payload);
    };
    this.sendAsync = payload => {
      this.rpcId++;
      return this.ws.post(payload);
    };
  }

  /** Setup an HTTP connection with the node */
  private setHttpProvider() {
    this.sendAsync = payload => {
      this.rpcId++;
      return this.http.post<RPCRes<any>>(this.url, payload);
    };
  }
}
