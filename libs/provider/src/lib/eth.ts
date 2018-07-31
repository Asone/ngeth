import { Injectable } from '@angular/core';
import { numberToHex, Block, Transaction, TxReceipt, toBN, hexToNumber } from '@ngeth/utils';
import { Provider } from './provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn : 'root' })
export class Eth {

  constructor(private provider: Provider) {}

  /** returns the last block number */
  public getBlockNumber(): Observable<string> {
    return this.provider
      .rpc<string>('eth_blockNumber')
      .pipe(map(block => toBN(block).toString(10)));;
  }

  /** returns the current gas price in wei */
  public getGasPrice(): Observable<number> {
    return this.provider
      .rpc<number>('eth_gasPrice')
      .pipe(map(block => toBN(block).toString(10)));
  }

  /******
   * BLOCK
   */
  /**
   * get the block according to its number
   * @param blockNumber can be of type number or a string containing a haxadecimal number
   */
  public getBlockByNumber(blockNumber): Observable<any> {
    const isNumber = typeof blockNumber === 'number';
    const params = isNumber ? numberToHex(blockNumber) : blockNumber;
    return this.provider
      .rpc<any>('eth_getBlockByNumber', [params, true])
      .pipe(map(block => (block ? new Block(block) : null)));
  }

  /**
   * get a block according ot its hash
   * @param blockHash 
   */
  public getBlockByHash(blockHash: string): Observable<any> {
    return this.provider
      .rpc<any>('eth_getBlockByHash', [blockHash, true])
      .pipe(map(block => (block ? new Block(block) : null)));
  }

  /*************
   * TRANSACTION
   */

   /**
    * get the informations about a transaction according to its hash
    * @return the transaction object
    */
  public getTransaction(transactionHash: string): Observable<any> {
    return this.provider
      .rpc<number>('eth_getTransactionByHash', [transactionHash])
      .pipe(map(tx => (tx ? new Transaction(tx) : null)));
  }

  /**
   * get the receipt of a transaction according to its hash. Not avalaible for pending transactions.
   * @param transactionHash 
   */
  public getTransactionReceipt(transactionHash: string): Observable<any> {
    return this.provider
      .rpc<number>('eth_getTransactionReceipt', [transactionHash])
      .pipe(map(receipt => (receipt ? new TxReceipt(receipt) : null)));
  }

  /**
   * get the number of transactions sent by the address until the block
   * @param address address of the sender
   * @param block 'latest' by default
   */
  public getTransactionCount(address : string, block : number | string = 'latest') : Observable<number>{
    return this.provider
      .rpc<string>('eth_getTransactionCount', [address, block])
      .pipe(map(txCount => hexToNumber(txCount)))
  }

  /***************
   * SUBSCRIPTIONS
   * specific to websockets
   */

   /**
    * returns a block when a new header is appended to the chain
    * In case of reorganization, all the blocks for the new chain are emitted
    */
  public onNewBlock() {
    return this.provider.rpcSub(['newHeads']).pipe(
      map(res => new Block(res))
    )
  }

  /**
   * indicates chan the node starts or stops synchronizing.
   * The result can be a boolean of an object recording the progress.
   */
  public isSyncing() {
    return this.provider.rpcSub(['syncing']);
  }
}
