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
        function addDataComplete(){
            this.eventEmitter.emit('blockAdded');
        }

        var boundAddDataComplete = addDataComplete.bind(this);
        let stringifiedNewData = JSON.stringify(newData);
        Promise.all([LevelDB.addDataToLevelDB(stringifiedNewData)]).then(() => this.loadData()).then(() => boundAddDataComplete())
    }

    loadData(){
        Promise.all([LevelDB.getData()]).then((data) => {
            this.data = data[0]
            if (this.isLoaded == true) {
                this.eventEmitter.emit('chainUpdated');
            }
            else{
                this.isLoaded = true
                this.eventEmitter.emit('chainLoaded');
            }
        })
    }

    // get block
    getBlock(blockHeight){
        // return object as a single string
        let block = this.data.filter((k) => k.key == blockHeight)[0]
        if (block !== undefined){
            return JSON.parse(block.value);
        }
        return undefined
   }
}

module.exports = Adapter