/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './data/tokenData';
const db = level(chainDB);
const levelDB =  require('./levelSandbox')

  module.exports.getData = () => {
    var dataArray = []
    return new Promise(function(resolve, reject) {
      db.createReadStream()
      .on('data', function (data) {
        data.value = JSON.parse(data.value);
        dataArray.push(data);
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function () {
        resolve(dataArray);
      });
    });
  }

  // Add data to levelDB with key/value pair
  module.exports.addLevelDBData = (key,value) => {
    console.log(key)
    return new Promise(function(resolve, reject) {
      db.put(key, value, function(err) {
        if (err) reject(err)
        resolve()
      })
    });
  }

  // Get data from levelDB with key
  function getLevelDBData(key){
    return new Promise(function(resolve, reject) {
      db.get(key, function(err, value) {
        if (err) reject(err);
        resolve(value)
      })
    });
  }


  // Delete data to levelDB with value
  module.exports.deleteData = (key) => {
    let i = 0;
    return new Promise(function(resolve, reject) {
      db.del(key, function (err) {
        if (err){
          reject(err)
        }
        else{
          resolve()
        }
      });
    });
  }


/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/

//  console.log(levelDB.getData(0).then((data) => showKey(data)))

// function showKey(data){
//   console.log(data)
// }

// (function theLoop (i) {
//   setTimeout(function () {
//     levelDB.addDataToLevelDB(new);
//     if (--i) theLoop(i)
//   }, 1000);
// })(10);

// showData()

// Promise.all([addDataToLevelDB('Testing data')]).then((result) => showData())

// function showData(){
//   getData().then((chain) => {
//     console.log(chain)
//   })
// }