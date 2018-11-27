# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain. This chain is uses LevelDb as a backend and express as the api.

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
- Install express with --save flag
```
npm install express --save
```
- Install body-parser with --save flag
```
npm install body-parser --save
```
## Testing The Blockchain

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


## Testing The Blockchain Api

To test code:
1: Open a command prompt or shell terminal
2: Start the server
```
node app.js
```
You should get the following reponse:
"SimpleChain listening on port <8000>!"
3: To test the Get Block end point, enter the following command replacing 8000 with your actual port:
```
curl http://localhost:8000/block/0
```
You should get a response similar to:
{
	"hash":"d808717540278674948f35a201d34429d67aae2ecb0467cac643275b497925d2",
	"height":0,
	"body":"First block in the chain - Genesis block",
	"time":"1540144474",
	"previousBlockHash":""
}
4: To test the POST Block Endpoint, enter the following command replacing 8000 with your actual port:
```
curl -d body=test1  http://localhost:8000/block
```
You should get a response(of the new block) similar to:
{
	"hash":"db1f3ee0660130d323f7247d1a17f0943b9144f03bfa0360567243ce9f3e8cb8",
	"height":14,
	"body":"test1",
	"time":"1540319399"
}

# Using the Blockchain Api as a (Stars)Notary
## Start the server
Step 1 : Enter the following command in the terminal
```
node app.js
```
## Request Validation
Step 1 : Request a message to sign by going to the URL: http://localhost:8000/requestValidation
Step 2 : Provide your public address and press Submit
```
You should get a response similar to:
{"address":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV",
"requestTimeStamp":"1542687172",
"message":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV:1542687172:starRegistry",
"valid":false,
"validationWindow":300}
```
### Request Validation using Curl
Request validation can be done using curl:
```
curl -X POST \
  http://localhost:8000/requestValidation \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "address":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV"
}'
```

## Verify Message
For this address to post into the blockchain notary, it will have to be verified.
Step 1 : Go to the URL : http://localhost:8000/verifyMessage
Step 2 : Enter the address your public address and the message you signed
For example
	 Address : 155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV
	 Signed Message : IJmigTeMeniOwxBwQq6CHGbKhpnFnJl8/bqMArmSbTy9BFyBsbrKa0Horx6hUBuWp4p4vOWubgn8sQFdzspq5Hk=
Step 3 : Press Submit. This should give you a verrification message
```
{
	"registerStar":true,
	"status":{
		"address":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV",
		"requestTimeStamp":"1542687172",
		"message":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV:1542687172:starRegistry",
		"validationWindow":166,"
		messageSignature":"valid"
		}
}
```
### Verify Message using Curl
A message can be verified using curl as well:
```
curl -X POST \
  http://localhost:8000/message-signature/validate \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
"address":"155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV",
 "signature":"IKNYd23P1Lys9CzWeop4T4wG347DastamMSroJuGX/T4MDiKPWY3XrDCsVzi603Lzy3N470ovwgpbi7lrojlj0Q="
}'
```
## Store Star Data in the Blockchain
Step 1. Navigate to : http://localhost:8000/Registar
Step 2. Enter public address and star data
Step 3. Press submit. You should get a response as similar to the json below:
{
     "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
      "height": 1,
      "body": {
           "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
           "star": {
                "ra": "16h 29m 1.0s",
                "dec": "-26° 29' 24.9",
                "story":
        "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
             }
       },
      "time": "1532296234",
       "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}

## Get star block by hash with JSON response.

To get a star by hash, use the following path : URL: http://localhost:8000/stars/hash:[HASH]

## Get star block by wallet address (blockchain identity) with JSON response.

To get a star by wallet address, use the following path : URL: http://localhost:8000/stars/address:[ADDRESS]

