const events = require('events');

class Adapter{
    constructor(){
        this.eventEmitter = new events.EventEmitter();
        this.isLoaded = false
        this.data = undefined

    }

    addData(newData){
        // Adding block object to chain
        this.data.push(newData)
        this.eventEmitter.emit('chainUpdated');
        this.eventEmitter.emit('blockAdded');
    }

    loadData(){
        this.data = []
        if (this.isLoaded == true) {
            this.eventEmitter.emit('chainUpdated');
        }
        else{
            this.isLoaded = true
            this.eventEmitter.emit('chainLoaded');
        }
    }

    // get block
    getBlock(blockHeight){
        // return object as a single string
        return JSON.parse(JSON.stringify(this.data[blockHeight]));
    }

}

module.exports = Adapter