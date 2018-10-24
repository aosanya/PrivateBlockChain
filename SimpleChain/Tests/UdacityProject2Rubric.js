const SimpleChain = require('../SimpleChain');
const Block  = require('../../Block/Block');


//  Instantiate blockchain with blockchain variable
let chain = new SimpleChain();

//  Generate 10 blocks using a for loop
console.log('Add Blocks');
for (var i = 0; i <= 10; i++) {
	chain.addBlock(new Block("test data " + i));
	console.log(chain.status());
}


// (function theLoop (i) {
//     // //  Check blocks are added : Mempool should be 0
//     // console.log(chain.status());
//     // console.log(chain.chain);

//     // // Validate blockchain
//     // chain.validateChain();
//     // // Induce errors by changing block data

//     // chain.chain[0] = { key: '0', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }
//     // chain.chain[1] = { key: '1', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }
//     // chain.chain[2] = { key: '2', value: '{"hash":"hacked!!!!","height":0,"body":"hacked","time":"1539920954","previousBlockHash":""}' }

//     // // Validate blockchain. The chain should now fail with blocks 0,1, and 2.
//     // chain.validateChain();
//     i++;
//     if (i < 10) theLoop(i);
//     }, 1000);
// })(10);