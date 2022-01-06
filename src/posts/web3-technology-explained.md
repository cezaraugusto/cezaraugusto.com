---
title: Web3 technology explained
date: 2021-10-05
description: Blockchains, nodes, contracts, transactions, addresses, blocks, protocols, dApps, cryptocurrencies, crypto tokens, NFTs. Welcome to the web3, friends.
tags:
  - web3
  - cryptocurrency
---

At first, websites were just a bunch of static pages with links between them. This was web 1.0 full of hyperlinks and citations. The internet was about information.

Once websites got dynamic enough to interact with, they started being called web apps. Web 2.0 arrived and thrived full of social media apps, online services, e-commerce, and all sorts of web conveniences.

Web 3.0 is possible thanks to "the blockchain." A decentralized database model stores information in blocks in a permanent, verifiable way. Records can be any piece of information you find interesting. Web 3.0 is about decentralization, and the blockchain has everything to do with it.

## The Blockchain

The blockchain is a globally shared database.

For everything to work correctly, the database (the blockchain) is shared by a group of computers running the same software to read and update data. The blockchain is a network of computers (servers) running the same software and interacting with it.

[IBM explains it well:](https://www.ibm.com/topics/what-is-blockchain)

1. As each transaction occurs, it is recorded as a "block" of data
2. Each block is connected to the ones before and after it
3. Transactions are blocked together in an irreversible chain: a blockchain

You say blockchains are decentralized because, for public blockchains, anyone can put their computer to work on it and do not depend on a single server/service.

There is no single cloud provider like AWS or GCP. People volunteer to put their machines at work in exchange for some sort of benefit.

## Nodes

Each computer is a server providing the program needed to read data and execute commands shared/requested on the network. A computer serving blockchain software is called a _server node_ or just a _node_.

Nodes need to talk to each other to validate the current state of the blockchain. They do so by achieving consensus about the state via a consensus protocol, a core mechanism of the blockchain that helps nodes in the network verify the transactions.

Once computers agree with the data update, the new data is pushed on top of the database, just after the last data block.

## Contracts

Computers need a program to set and retrieve the current data state since everyone participating in the network can read what's in the database. New data storage can only be set through consensus (data updates need to be validated by other computers before approval) 

They do it with a piece of code called a smart contract, or just a "contract."

A contract is made of functions and data (its state). Functions are used to perform all sorts of data operations related to the contract. The data will be used to update every request hitting it.

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

When a node reads a contract, the code is executed. Once consensus is reached by other network nodes, data is sent to the network, and the blockchain is updated.

When a contract is reached, its code is executed by the node. Once all participants agree that the data update is valid, a transaction happens.

## Transactions

When we want to make a change to the blockchain, we call it a transaction.

When a node reads a contract, it needs to talk to another node looking for consensus about whether or not the operation was valid. All operations changing the blockchain happen through transactions. Exchanging currencies, minting an NFT, deploying a smart contract, so on.

Transactions are nothing more than data transfers that get permanently recorded and can be accessed for future references at any given point due to the nature of the blockchain.

You either fully make a transaction or don't make it at all. For cryptocurrencies, consensus checks ensure only the person holding the keys to the account can transfer money from it.

## Consensus protocols

For a block to be validated, nodes need to agree on whether the transaction is valid. This agreement is made once all nodes agree about the transaction results. Blockchains rely on mechanisms called "proofs" to validate data changes.

### Proof of Work

Bitcoin uses the proof of work (PoW) protocol. The protocol computes the hash values to validate transactions until a given condition is reached. This operation relies heavily on computer performance, which makes the validation time-intensive and costly and doesn't make Bitcoin a great candidate to develop applications on top of it.

### Proof of Stake

Another famous consensus protocol is the proof of stake (PoS), used by Ethereum. It works by assigning a block of data to the node, allocating some of its cryptocurrency resources to start validating the data update, and receiving a stake of the data transaction in exchange. This task isn't as costly and time-intensive as the Proof of Work. It allows a more practical development of decentralized applications.


## Addresses

A blockchain address is always unique and serves as a virtual location where the cryptocurrency can be sent. People can send cryptocurrency to addresses similar to the way banks transfer fiat currencies through bank accounts.

For the sake of knowledge, let's leverage the addresses of the two most famous blockchain implementations:

### Types of Bitcoin Addresses

Bitcoin has three types of addresses. The **P2PKH** format called Legacy Address Format (addresses starting with "1"), the **P2SH** format called Compatibility Address Format (addresses starting with "3"), and the **Bech32** format, also called the Segwit Address Format (addresses starting with "bc1").

### Types of Ethereum Addresses

Ethereum has two types of addresses: the **Externally Owned Address (EOAs)**, an account of public and private key pair to hold your funds, and the **Contract Address**, which is the address used by contracts to execute functions.

Addresses work like email. You have an email address and a password that gives you access to your email account with email. Like emails, blockchain addresses also have their own private keys. Knowing that gives you access to the data stored in that address, such as cryptocurrencies.

## Blocks

The code (contract) that is read by the computer (node) can be sent by any other computer (let' call them nodes forever) in the network. Once the contract is run, the node executes the function within the program (transaction), and the message (block) is sent.

The data within the block can be anything. A block consists of its data and a unique hash to identify itself. Since blocks are chained, it also includes the previous block's hash.

{% Figure {
  src: '/assets/images/posts/post-006/001.png',
  caption: 'A block of bitcoin data consists of "from," "to," and "amount."'
} %}


These blocks form a linear sequence in time, where the word "blockchain" derives from. Blocks are added to the chain in rather regular intervals. [Bitcoin takes about 10 minutes](https://coinmarketcap.com/alexandria/article/how-long-does-a-bitcoin-transaction-take) to confirm a block transaction, and for Ethereum, this time is [around 17 seconds](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#blocks).

## dApps

dApps are web applications enabled to access blockchain data. They do so by communicating with smart contacts to communicate with the blockchain and execute transactions.

{% Figure {
  src: '/assets/images/posts/post-006/002.png',
  caption: 'Sample Ethereum dApps'
} %}

A common web app relies on front-end technology (HTML, CSS, JavaScript). It performs database checks, some sort of API (if needed) to connect with it.

dApps don't need APIs to connect to databases because it uses the blockchain. They use smart contracts as a middle layer instead of connecting to the blockchain directly.

Wallets manage your blockchain address and the keys necessary to identify and authenticate yourself, and that's how dApps build the "back-end" service by connecting to a wallet with access to the blockchain network.

## Cryptocurrencies and Tokens

A cryptocurrency is the native currency of a blockchain. Often used to pay transaction costs. Popular cryptocurrencies are Bitcoin and Ether.

A crypto token is built on top of cryptocurrencies. The native token for the Ethereum blockchain is Ether, but other tokens also depend on the Ethereum Blockchain, such as $BNB or $BAT.

Tokens can hold values and be exchanged like any other cryptocurrency but also offers a way to represent other sorts of assets. For example, some tokens represent art in the form of NFTs.

The process of creating tokens and assigning them value is called tokenization.

## NFTs

{% Figure {
  src: '/assets/images/posts/post-006/003.png',
  caption: 'CryptoPunks, a 10,000 NFT collection'
} %}

[https://www.larvalabs.com/cryptopunks](CryptoPunks) are a unique cllective of 10,000 unique characters.

NFTs are a special kind of token used to represent ownership of unique items. By design, only one owner is allowed to own the token. Due to the immutable nature of blockchains, no one can modify the record of ownership.

The key difference between your usual (fungible) token and NFTs is that NFTs aren't fungible (NFT stands for Non-Fungible Tokens). They are helpful to describe unique things and represent authorial work such as digital art.

You can exchange 1 ETH for $1 because they are fungible, in terms that their value defines them, as opposed to NFT, where they are defined by their unique properties.

## Welcome to the web3, friends!

Hope this post helped you figure out how the web3 works, and **welcome to the web3, friends!**

**References and further reading:**

* [Chatham House Primer: Blockchain](https://www.youtube.com/watch?v=JU3r4WM0-6g)
* [IBM - What is Blockchain](https://www.ibm.com/topics/what-is-blockchain)
* [How does a blockchain work - Simply Explained](https://www.youtube.com/watch?v=SSo_EIwHSd4)
* [How the Three Formats of Bitcoin Addresses Work](https://cryptocurrencyfacts.com/bitcoin-address-formats/)
* [What is an Ethereum Address?](https://info.etherscan.com/what-is-an-ethereum-address/)
* [An Overview of Consensus Protocols in Blockchain](https://www.section.io/engineering-education/blockchain-consensus-protocols/)
* [Cryptocurrency and Crypto Tokens: What's the difference?](https://gadgets.ndtv.com/cryptocurrency/news/cryptocurrency-crypto-token-difference-meaning-explained-bitcoin-ethereum-ether-dai-link-comp-digital-asset-blockchain-2502146)
* [Introduction to Smart Contracts](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html)
