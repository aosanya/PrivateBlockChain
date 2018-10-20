# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#Cloning
To clone this project from github, use the following link:
https://github.com/aosanya/PrivateBlockChain.git

#Or Download Zip
To download the project from github, use the following link:
https://github.com/aosanya/PrivateBlockChain/archive/master.zip

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```

## Testing

To test code:
1: Open a command prompt or shell terminal after installing node.js.
2: Change directory to SimpleChain
3: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
4: import modules
```
const SimpleChain = require('./SimpleChain');
const Block  = require('../Block/Block');
```
5: Instantiate blockchain with blockchain variable
```
let chain = new SimpleChain();
```
6: Generate 10 blocks using a for loop
```
for (var i = 0; i <= 10; i++) {
	chain.addBlock(new Block("test data "+i));
	console.log(chain.status());
}
```
7: Check blocks are added : Mempool should be 0
```
console.log(chain.status());
```
8: Validate blockchain
```
chain.validateChain();
```
9: Induce errors by changing block data
```
chain.chain[0] = { key: '0', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }
chain.chain[1] = { key: '1', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }
chain.chain[2] = { key: '2', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }
```
10: Validate blockchain. The chain should now fail with blocks 0,1, and 2.
```
chain.validateChain();
```
