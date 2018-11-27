// Setup libraries
const bitcoin = require('bitcoinjs-lib')
const bitcoinMessage = require('bitcoinjs-message')

// Given the message and private key, sign a Bitcoin message
var testnet = bitcoin.networks.testnet
//var keyPair = bitcoin.ECPair.makeRandom({ network: testnet })
//let publicKey = keyPair.publicKey.toString('hex');
//console.log(keyPair.toWIF())
//console.log(publicKey)


//var keyPair1 = bitcoin.ECPair.makeRandom({ network: testnet })
//console.log(keyPair1.toWIF())
//console.log(keyPair1.publicKey.toString('hex'))

//var privateKey = keyPair1.toWIF()// "cRCTvgAHAM2n5VVLz4PoNudz6U9meBCn6Yo54B6wTHH761QtUzNw"

// console.log(keyPair.publicKey)
var privateKey = "cPW8xsSfEWRi2HWwADhwWLDUUXwVQL3cpaibtNRiDgnD5J7quExh"
var keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);
let publicKey = keyPair.publicKey.toString('hex');
console.log(keyPair.toWIF())
console.log("Public Key : " + publicKey)

const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
console.log(address)

var message = "155wiwAx1VoKpJeS2YompHEHFyhfoLA3mV:1543293746:starRegistry"

var signature = bitcoinMessage.sign(message, keyPair.privateKey, keyPair.compressed)
let kP = bitcoin.ECPair.makeRandom()


// // Print out the signature
console.log("Message Signature : " + signature.toString('base64'))
console.log("Address : " + address)

console.log("curl -X POST \
 http://localhost:8000/message-signature/validate \
 -H 'Content-Type: application/json' -H 'cache-control: no-cache' -d '{\"address\":\""+ address + "\",\"signature\":\"" + signature.toString('base64') + "\"}'")


console.log(bitcoinMessage.verify(message,address,signature.toString('base64')))