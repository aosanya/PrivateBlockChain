const levelDB = require('../../SimpleChain/storageAdapters/levelDb/levelSandbox');
const Block = require('../Block');

let newBlock = new Block('Test Data 1');
let str = JSON.stringify(newBlock)
let parse = JSON.parse(str);
console.log(parse);
// console.log(levelDB.getData(0).then((data) => showKey(data)))

// function showKey(data){
//   console.log(data[0].value)
// }

// var key = 0;
// (function theLoop (i) {
//     key += 1;
//     setTimeout(function () {
//       let newBlock = new Block('Test Data ' + i - 10);
//       newBlock.height = key
//       console.log(newBlock)
//       levelDB.addDataToLevelDB(newBlock);
//       if (--i) theLoop(i)
//     }, 1000);
// })(10);