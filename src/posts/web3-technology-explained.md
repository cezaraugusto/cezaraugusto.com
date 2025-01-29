---
title: Web3 technology explained
date: 2021-10-05
description: Blockchains, nodes, contracts, transactions, addresses, blocks, protocols, dApps, cryptocurrencies, crypto tokens, NFTs. Welcome to the web3, friends.
tags:
  - web3
  - cryptocurrency
---

At first, websites were just a bunch of static pages linking each other, like a physical document copy but with an option to jump between documents. The internet 1.0 was about information.

Once websites got dynamic enough to interact with, they started being called web apps. Web 2.0 arrived and thrived full of dynamic HTML pages (because JavaScript got better?), social media apps, online services, and e-commerces. All sorts of web conveniences.

Now we have Web 3.0. Possible thanks to "the blockchain." A decentralized database model stores information in a single chain of blocks in a permanent, verifiable way. Records can be any piece of information you find interesting.

Web 3.0 is about distributed control, and this post is an explanation of the tech behind it.

Technically speaking, the web3 allows better governance of institutions, a new option to distribute assets between company working members, auditable public data for governments, the list goes on.

You still see a bunch of useless jpegs worth millions, but it's more than that. That's because of how the concept of blockchain works.

## The Blockchain

The blockchain is a shared database.

For everything to work correctly, the database (the blockchain) is shared by a group of computers running the same software to read and update data. The blockchain is a network of computers (servers) running the same software and interacting with it.

[IBM explains it well:](https://www.ibm.com/topics/what-is-blockchain)

1. As each transaction occurs, it is recorded as a "block" of data
2. Each block is connected to the ones before and after it
3. Transactions are blocked together in an irreversible chain: a blockchain

You say blockchains are decentralized because, for public blockchains, anyone can put their computer to work on it and do not depend on a single server/service.

There is no single cloud provider like AWS or GCP. People volunteer to put their machines at work in exchange for some benefit.

Let's talk about these computers.

## Nodes

A node is a computer running the _blockchain software_.

The blockchain need computers running their software and responding to requests on the network to work. Nodes talk to each other to validate the current state of the blockchain. A computer serving blockchain software is called a _server node_ or just a _node_.

Their function is to validate the data being transacted, and they do so by achieving consensus about the current blockchain state via a consensus protocol, a core mechanism of the blockchain that helps nodes in the network verify the transactions.

Once computers involved in the transaction agree with the data update, the new data is pushed on top of the last data block.

But what function do these node computers do?

## Contracts

Nodes need a program to set and retrieve the current data state. _At which block are we right now? Is the current processing block valid?_

Blockchain data is auditable by all, but for inserting new data (you can't change them once it's published), you need a computer program to do so. In most cases, the program is called a _contract_.

Contract names can vary. The Ethereum blockchain calls it a _smart contract_. Solana calls it _program_. On other blockchains _contract_ seems to be the default name convention.

A contract is made of functions and data (its state):

- Functions are used to perform all sorts of data operations related to the contract. It's the piece of code that will run every time someone requests the contract.
- State refers to the data after being processed by a contract. The value will be sent to the blockchain once it's approved by other computers doing the same task.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

// A contract is similar to an OOP class
contract SimpleStorage {
    // Stores our data state
    uint storedData;

    // Set function that will update
    // the contract state every time
    // the contract is read by the computer
    function set(uint x) public {
        storedData = x;
    }

    // Retrieve values
    function get() public view returns (uint) {
        return storedData;
    }
}
```

_In this example, the contract defines the functions set and get that can be used to modify or retrieve the variable's value. Adapted from [Solidity docs](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#simple-smart-contracts)._

### A contract is

Take a group of nodes selected randomly by the blockchain to validate the current transaction, and if its valid, update the blockchain with this new block of data. Do it by having a contract to make the updates for each transaction.

But what is a transaction?

## Transactions

When we want to make a change to the blockchain, we call it a transaction.

When a node reads a contract, it needs to talk to another node looking for consensus about whether or not the operation was valid. All operations changing the blockchain happen through transactions. Exchanging currencies, minting an NFT, deploying a contract, everything.

Transactions are nothing more than data transfers that get permanently recorded and can be accessed for future references at any given point due to the blockchain's immutable nature, which allows you to read, write, but not delete or update data.

You either fully make a transaction or don't make it at all. For cryptocurrencies, consensus checks ensure only the person holding the keys to the account can transfer money from it.

At least to me, consensus is a new word. What is a consensus protocol?

## Consensus protocols

Nodes need to agree on whether the transaction is valid for a block to be validated. This agreement is made once all nodes make the same transaction and get the same result. Blockchains rely on mechanisms called "proofs" to validate data changes.

### Proof of Work

Bitcoin uses the proof of work (PoW) protocol. The protocol computes the hash values to validate transactions until a given condition is reached. This operation relies heavily on computer performance, which makes the validation time-intensive and costly and doesn't make Bitcoin a great candidate to develop applications on top of it.

### Proof of Stake

Another famous consensus protocol is the proof of stake (PoS), used by Ethereum. It works by assigning a block of data to the node, allocating some of its cryptocurrency resources to start validating the data update and receiving a stake of the data transaction in exchange. This task isn't as costly and time-intensive as the Proof of Work and allows the development of decentralized applications (dApps) in practical terms.

## Addresses

A blockchain address is a unique identifier used to set a virtual location where the cryptocurrency can be sent. People can send cryptocurrency to addresses similar to the way banks transfer fiat currencies through bank accounts. Addresses can host both wallets and contracts.

For the sake of knowledge, let's leverage the addresses of the two most famous blockchain implementations:

### Types of Bitcoin Addresses

Bitcoin has three types of addresses. The **P2PKH** format called Legacy Address Format (addresses starting with "1"), the **P2SH** format called Compatibility Address Format (addresses starting with "3"), and the **Bech32** format, also called the Segwit Address Format (addresses starting with "bc1").

### Types of Ethereum Addresses

Ethereum has two types of addresses: the **Externally Owned Address (EOAs)**, an account of public and private key pair to hold your funds, and the **Contract Address**, which is the address used by contracts to execute functions.

### Addresses are like

Addresses work like email. You have an email address and a password that access your email account with email. Like emails, blockchain addresses also have their private keys. Knowing that gives you access to the data stored in that address, such as cryptocurrencies.

## Blocks

The code (contract) that is read by the computer (node) can be sent by any other computer (let' call them nodes forever) in the network (blockchain). Once the contract is run, multiple nodes execute the function within the program, and once they agree about the result, a transaction happens, and the data resulting from this transaction (block) is sent.

The data within the block can be anything. A block consists of its data and a unique hash to identify itself. Since blocks are chained, it also includes the previous block's hash.

{% Figure {
  src: '/static/images/posts/post-006/001.png',
  caption: 'A block of bitcoin data consists of "from," "to," and "amount."'
} %}

These blocks form a linear sequence in time, where the word "blockchain" derives. Blocks are added to the chain in rather regular intervals. [Bitcoin takes about 10 minutes](https://coinmarketcap.com/alexandria/article/how-long-does-a-bitcoin-transaction-take) to confirm a block transaction, and for Ethereum, this time is [around 17 seconds](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#blocks).

[Kraken has an interesting table](https://support.kraken.com/hc/en-us/articles/203325283-Cryptocurrency-deposit-processing-times) about how long a transaction takes on their platform depending on the blockchain you use.

## dApps

dApps (decentralized applications) are web applications enabled to access blockchain data. They do so by communicating with contacts to communicate with the blockchain and execute transactions.

{% Figure {
  src: '/static/images/posts/post-006/002.png',
  caption: 'Sample Ethereum dApps'
} %}

A common web app relies on front-end technology (HTML, CSS, JavaScript). It performs database checks, some API (if needed) to connect with it.

**dApps don't need APIs to connect to databases** because it uses the blockchain. They use contracts as a middle layer instead of connecting to the blockchain directly.

{% Figure {
  src: '/static/images/posts/post-006/004.png',
  caption: 'dApp flow to hit the blockchain'
} %}

Crypto wallets manage your blockchain address and the keys necessary to identify and authenticate yourself. dApps take advantage of that to build their "back-end" service. The wallet acts as a middle layer between your app and the blockchain. It allows you to perform operations via their API, providing web app developers (dApp developers now) access to the blockchain network.

## Cryptocurrencies and (Crypto) Tokens

A cryptocurrency is the native currency of a blockchain. They are often used to pay other people or transaction costs. Popular cryptocurrencies are Bitcoin and Ether.

A crypto token is built on top of cryptocurrencies. The native token for the Ethereum blockchain is Ether, but other tokens also depend on the Ethereum Blockchain, such as $BNB or $BAT.

Tokens can hold values and be exchanged like any other cryptocurrency but also offers a way to represent other sorts of assets. For example, some tokens represent art in the form of NFTs.

The process of creating tokens and assigning them value is called tokenization. One prominent kind of token is the NFT.

## NFTs

{% Figure {
  src: '/static/images/posts/post-006/003.png',
  caption: 'CryptoPunks (https://www.larvalabs.com/cryptopunks) are a unique cllective of 10,000 unique characters.'
} %}

NFTs are a special token used to represent ownership of unique items. By design, only one owner is allowed to own the token. Due to the immutable nature of blockchains, no one can modify the record of that ownership.

The key difference between your usual (fungible) token and NFTs is that NFTs aren't fungible (NFT stands for Non-Fungible Tokens). You can exchange 1 ETH for $1 because their value defines them.

Their unique properties define NFTs. They are helpful to describe unique things such as game characters and represent authorial work such as digital art, namely jpegs worth millions of dollars and music.

## Welcome to the web3, friends!

I hope this post helped you figure out how the web3 works and **welcome to the web3, friends!**

**References and further reading:**

- [Chatham House Primer: Blockchain](https://www.youtube.com/watch?v=JU3r4WM0-6g)
- [IBM - What is Blockchain](https://www.ibm.com/topics/what-is-blockchain)
- [How does a blockchain work - Simply Explained](https://www.youtube.com/watch?v=SSo_EIwHSd4)
- [How the Three Formats of Bitcoin Addresses Work](https://cryptocurrencyfacts.com/bitcoin-address-formats/)
- [What is an Ethereum Address?](https://info.etherscan.com/what-is-an-ethereum-address/)
- [An Overview of Consensus Protocols in Blockchain](https://www.section.io/engineering-education/blockchain-consensus-protocols/)
- [Cryptocurrency and Crypto Tokens: What's the difference?](https://gadgets.ndtv.com/cryptocurrency/news/cryptocurrency-crypto-token-difference-meaning-explained-bitcoin-ethereum-ether-dai-link-comp-digital-asset-blockchain-2502146)
- [Introduction to Smart Contracts](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html)
