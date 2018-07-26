# Eth

## Summary

#### Basics
+ [getBlockNumber](###getBlockNumber())
+ [getGasPrice](###getGasPrice())
#### Block
+ [getBlockByNumber](###getBlockByNumber(blockNumber))
+ [getBlockByHash](###getBlockByHash(hash))
#### Transactions
+ [getTransaction](###getTransaction(hash))
+ [getTransactionReceipt](###getTransactionReceipt(hash))
#### Subscriptions
+ [onNewBlock](###onNewBlock())
+ [isSyncing](###isSyncing())


## Basics

### getBlockNumber()
returns the last block number.

Returns an `Observable<string>`

### getGasPrice()
returns the current price per gas in wei.

Returns an `Observable<number>`

## Block

### getBlockByNumber(blockNumber)
get the block relative to its number. The parameter can be a number or a string containing a hexadecimal number.

Returns an `Observable`

### getBlockByHash(hash)

get the block relative to its hash.

Returns an `Observable`


## Transaction

### getTransaction(hash)

get the informations about the transaction relative to its hash.

Returns an `Observable`

### getTransactionReceipt(hash)

get the receipt of a transaction by its hash. It is not avalaible for pending transactions.

Returns an `Observable`


## Subscriptions

### onNewBlock()

Each a new header is appended to the chain, returns a Block containing the informations. In cas of chain reorganization, all the blocks for the new chain are emitted (and these blocks are on the same height).

Returns an `Observable`

### isSyncing()

Indicates when the node starts or stops synchronizing. The result can be a boolean of an object recording the progress.

Returns an `Observable`