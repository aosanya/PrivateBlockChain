const LevelDB =  require('./levelSandbox')
const events = require('events');


class Adapter{
    constructor(){
        this.eventEmitter = new events.EventEmitter();
        this.isLoaded = false
        this.data = undefined
        this.initialLoadData()
    }

    addData(newBlock){
        // Adding block object to chain
        Promise.all([LevelDB.addDataToLevelDB(newBlock)]).then(() => this.loadData())
    }

    loadData(){
        Promise.all([LevelDB.getData()]).then((data) => {
            this.data = data
            this.eventEmitter.emit('chainUpdated');
        })
    }

    initialLoadData(){
        Promise.all([LevelDB.getData()]).then((data) => {
            this.data = data
            this.isLoaded = true
            console.log('Count Initial: ' + this.data.length)
            console.log(this.data)
            this.eventEmitter.emit('chainLoaded');
        })
    }
}

module.exports = Adapter