const events = require('events');


class Adapter{
    constructor(){
        this.eventEmitter = new events.EventEmitter();
        this.isLoaded = false
        this.data = undefined
    }

    addData(newData){
        // Adding block object to chain
        this.data[0].push(newData)
    }

    loadData(){
        this.data = [[]]
        if (this.isLoaded == true) {
            this.eventEmitter.emit('chainUpdated');
        }
        else{
            this.isLoaded = true
            this.eventEmitter.emit('chainLoaded');
        }
    }
}

module.exports = Adapter