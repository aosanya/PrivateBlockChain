const LevelDB =  require('./levelSandbox')
const events = require('events');


class Adapter{
    constructor(){
        this.eventEmitter = new events.EventEmitter();
        this.isLoaded = false
        this.data = undefined
    }

    addData(newData){
        // Adding block object to chain
        Promise.all([LevelDB.addDataToLevelDB(newData)]).then(() => this.loadData())
    }

    loadData(){
        Promise.all([LevelDB.getData()]).then((data) => {
            this.data = data
            if (this.isLoaded == true) {
                this.eventEmitter.emit('chainUpdated');
            }
            else{
                this.isLoaded = true
                this.eventEmitter.emit('chainLoaded');
            }
        })
    }
}

module.exports = Adapter