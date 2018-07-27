# Eth

## Summary

#### Basics
+ [getBlockNumber](#getblocknumber)
+ [getGasPrice](#getgasprice)
#### Block
+ [getBlockByNumber](#getblockbynumberblocknumber)
+ [getBlockByHash](#getblockbyhashhash)
#### Transactions
+ [getTransaction](#gettransactionhash)
+ [getTransactionReceipt](#gettransactionreceipthash)
#### Subscriptions
+ [onNewBlock](#onnewblock)
+ [isSyncing](#issyncing)


## Basics

### getBlockNumber()
returns the last block number.

Returns an `Observable<string>`

### getGasPrice()
returns the current price per gas in wei.

Returns an `Observable<number>`

## Block

### getBlockByNumber(blockNumber)
get the block according to its number. The parameter can be a number or a string containing a hexadecimal number.

Returns an `Observable`

### getBlockByHash(hash)

get the block according to its hash.

Returns an `Observable`


## Transaction

### getTransaction(hash)

get the informations about the transaction according to its hash.

Returns an `Observable`

### getTransactionReceipt(hash)

get the receipt of a transaction according to its hash. This receipt is not avalaible for pending transactions.

Returns an `Observable`


## Subscriptions

Specific to websockets

### onNewBlock()

Each a new header is appended to the chain, returns a Block containing the informations. In cas of chain reorganization, all the blocks for the new chain are emitted (and these blocks are on the same height).

Returns an `Observable`

### isSyncing()

Indicates when the node starts or stops synchronizing. The result can be a boolean of an object recording the progress.

Returns an `Observable`