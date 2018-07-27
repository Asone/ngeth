# Auth

## Summary

#### [Examples](#examples)

#### AuthWallet
+ [Properties](#properties)
+ [getKeystore](#getkeystoreaddress)
+ [getAccounts](#getaccounts)
+ [create](#create
+ [save](#saveaccount-password)
+ [encrypt](#encryptprivatekey-password-options)
+ [decrypt](#decryptkeystore-password)
+ [sendTransaction](#sendtransactiontx-privatekey)
+ [sendRawTransaction](#sendrawtransactionrawtx)
+ [signTx](#signtxtx-privatekey)
+ [sign](#signmessage-address-password)


#### AuthAccount
+ [Properties](#properties-1)
+ [getAccounts](#getaccounts)
+ [sendTransaction](#sendtransactiontx-blocktag)
+ [getBalance](#getbalanceaddress-blocktag)
+ [getTransactionCount](#gettransactioncountaddress-blocktag)
+ [sign](#signmessage-address-pwd)

#### Accounts
+ [create](#create
+ [fromPrivate](#fromprivateprivatekey)
+ [encrypt](#encryptprivatekey-password-encryptoptions)
+ [decrypt](#decryptkeystore-password-1)

#### Types
+ [EthAccount](#ethaccount)
+ [EncryptOptions](#encryptoptions)

## Examples

👷

## AuthWallet

### Properties
+ **defaultAccount**
+ **keystores$** : mapping of the keystores stored in localStorage
+ **account$** : the current account (same as defaultAccount)

### getKeystore(address)
returns a specific keystore from its address, if it was previously savec in the local storage with [`save`](#saveaccount-password).

### getAccounts()
returns all the addresses avalaible in the keystore

Returns an `Observable<string[]>`

### create()
returns a new [`EthAccount`](#ethaccount). ⚠️ This object contains the private key and the address of the account

### save(account, password)
stores the keystore in the localStorage. account is of type `EthAccount`

### encrypt(privatekey, password, options?)
encrypts the private key into a store and returns it. The list of options is of type [`Partial<EncryptOptions>`](#encryptoptions)

### decrypt(keystore, password)
decrypts a keystore object and returns an `EthAccount`

### sendTransaction(tx, privatekey)
send a transaction by signing it. tx is of type [`TxObject`](../utils/types.md#txobject)

### sendRawTransaction(rawTx)
send a transaction to the node

Returns an `Observable<string>`

### signTx(tx, privatekey)
sign a transaction with a private key

### sign(message, address, password)
sign a message with the address and the password needed to decrypt the private key

### signMessage(message, privatekey)
sign a message with the private key




## AuthAccount

### Properties<id1>
+ **defaultAccount**
+ **account$** : the current account (same as defaultAccount)

### getAccounts()
get the list of accounts available on the node

Returns an `Observable<string[]>`

### sendTransaction\<T\><id1>(tx, blockTag)
send a transaction to the node, with the txObject and the blockTag (can be `earliest`, `latest` (default) or `pending`)

Returns an `Observable`

### getBalance(address, blockTag?)
get the balance of the address on the block passed in parameter (can be a BlockTag type - see above, or a number). `latest` is the default.

Returns an `Observable`

### getTransactionCount(address, blockTag?)
returns the number of transactions sent by an address.

Returns an `Observable`

### sign<id1>(message, address, pwd)
returns the signature of a message

Returns an `Observable`


## Accounts

### create()
create a private key and its corresponding address, then returns an `EthAccount`

### fromPrivate(privatekey)
returns the `EthAccount` corresponding to the private key. The private key can be in hexadecimal or in Buffer form.

### encrypt(privatekey, password, encryptOptions?)
encrypts a private key into a jeystore and returns it

### decrypt<id1>(keystore, password)
decrypts a keystore object and returns a `EthAccount` if successfull

## Types

### EthAccount

| Property      | Type          | Description |
| ------------- |:-------------:|:-----|
|**privateKey** | string | the private key of the account
| **address** | string| the address of the account

### EncryptOptions

| Property      |
| ------------- |
|**salt** |
| **iv** |
|**kdf** | 
|**c** | 
|**prf** |
|**dklen** | 
|**n** | 
|**r** | 
|**cipher** | 
|**uuid** |