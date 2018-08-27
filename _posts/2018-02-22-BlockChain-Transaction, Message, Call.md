---
layout: post
title:  " Transaction, Message, Call "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}

## Concept Define

[Docs >> Introduction to Smart Contracts](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#subcurrency-example)

## Question 

Q. [What is the difference between a transaction and a call?](https://ethereum.stackexchange.com/questions/765/what-is-the-difference-between-a-transaction-and-a-call)

## Call 

A call is a local invocation of a contract function that does not broadcast or publish anything on the blockchain.

It is a read-only operation and will not consume any Ether. It simulates what would happen in a transaction, but discards all the state changes when it is done.

It is synchronous and the return value of the contract function is returned immediately.

## Transaction

A transaction is broadcasted to the network, processed by miners, and if valid, is published on the blockchain.

It is a write-operation that will affect other accounts, update the state of the blockchain, and consume Ether (unless a miner accepts it with a gas price of zero).

It is asynchronous, because it is possible that no miners will include the transaction in a block (for example, the gas price for the transaction may be too low). <br> Since it is asynchronous, the immediate return value of a transaction is always the transaction's hash. To get the "return value" of a transaction to a function, Events need to be used

## Recommendation to Call first, then sendTransaction

Since a sendTransaction costs Ether, it is a good practice to "test the waters" by issuing a call first, before the sendTransaction. This is a free way to debug and estimate if there will be any problems with the sendTransaction, for example if an Out of Gas exception will be encountered.

This "dry-run" usually works well, but in some cases be aware that call is an estimate, for example a contract function that returns the previous blockhash, will return different results based on when the call was performed, and when the transaction is actually mined.

Finally, note that even though a call does not consume any Ether, sometimes it may be necessary to specify the actual gas amount for the call: the default gas for call in clients such as Geth, may still be insufficient and can still lead to Out of Gas.

---

Q. [What is the difference between transaction and message?](https://ethereum.stackexchange.com/questions/7358/what-is-the-difference-between-transaction-and-message)


```
Transaction: A piece of data, signed by an External Actor. 

It represents either a Message or a new Autonomous Object. 

Transactions are recorded into each block of the blockchain.
```

This means that a transaction represents either a Message or a new contract.

```
Message: Data (as a set of bytes) and Value (specified as Ether) that is passed between two 

Accounts, either through the deterministic operation of an Autonomous Object or the 

cryptographically secure signature of the Transaction
```

This means that a Message is the data and amount of Ether that is passed between two accounts.

A message is created by contracts interacting with each other, or by a transaction. 

(In practice the Ether is specified in units of Wei.)

<br>

Transactions are explicitly on the blockchain, and messages are "internal", see [example](https://ethereum.stackexchange.com/questions/6429/normal-transactions-vs-internal-transactions-in-etherscan/6476#6476).



