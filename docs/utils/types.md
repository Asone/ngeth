# Types

## Summary
[Block](##Block)

[Transaction](##Transaction)


## Block

| Property      | Type          | Description |
| ------------- |:-------------:|:-----|
|**number** | number | the block number, null when pending
| **hash** | string|hash of the block, null when pending
| **parentHash** | string |hash of the parent block
|**nonce** | string | hash of the generated proof-of-work, null when pending
|**sha3Uncles** | string | SHA3 of the uncles data in the block
| **logsBloom** |string | the bloom filter for the logs of the block, null when pending
| **transactionsRoot** | string | root of the transaction trie of the block
| **stateRoot** | string | root of the final state trie of the block
| **receiptsRoot** | string | root of the receipts trie of the block
| **miner** | string | address of the beneficiary to whom the mining rewards were given
|**difficulty** | string | integer of the difficulty for this block
|**totalDifficulty**| string | integer of the total difficulty of the chain until this block
|**size** | string | integer of the size of this block in bytes
|**extraData**| string | the "extra data" field of this block
|**gasLimit** | string | the maximum gas allowed in this block
|**gasUsed**| string | the total used gas by all transactions in this block
|**timestamp**| number |the unix timestamp for when the block was collated
|**transactions**|string[ ]|Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter
|**uncles**| string[ ] | Array of the uncles hashes

N.B. : Be aware that most of the numbers in this class are "stringified", like the difficulty.

## Transaction
| Property      | Type          | Description |
| ------------- |:-------------:|:-----|
|**hash** | string | hash of the transaction
| **nonce** | number | the number of transactions made by the sender prior to this one
| **blockHash** | string | hash of the block where is this transaction, null when pending
|**blockNumber** | number | block number where is this transaction, null when pending
|**transactionIndex** | number | index of the position in the transactions array, null when pending
| **from** |string | address of the sender
| **to** | string | address of the receiver, null when it's a contract creation
| **value** | string | BigNumber : value transferred in wei
| **gas** | number | gas provided by the sender
| **gasPrice** | number | gas price provided by the sender in wei
| **input** | string | the data send along the transaction



