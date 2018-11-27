const LevelDB =  require('./levelSandbox')
const events = require('events');

class Adapter{
    constructor(){
        this.eventEmitter = new events.EventEmitter();
        this.isLoaded = false
        this.data = undefined
    }

    addData(data){
        // Adding block object to chain
        //console.log("add Token")
        function addDataComplete(){
            this.eventEmitter.emit('tokenAdded', data);
        }

        var boundAddDataComplete = addDataComplete.bind(this);
        let stringifiedNewData = JSON.stringify(data);
        Promise.all([LevelDB.addLevelDBData(data.address, stringifiedNewData)]).then(() => this.loadData()).then(() => boundAddDataComplete())
    }

    updateData(key, data){
        // Update block object to chain
        function updateComplete(){
            this.eventEmitter.emit('tokenUpdated', data);
        }

        var boundUpdateComplete = updateComplete.bind(this);
        let stringifiedData = JSON.stringify(data);

        Promise.all([LevelDB.addLevelDBData(key, stringifiedData)]).then(() => this.loadData()).then(() => boundUpdateComplete())
    }

    deleteData(key){
        //console.log("delete Data")
        function deleteDataComplete(){
            this.eventEmitter.emit('tokenDeleted', key);
        }

        var boundDeleteDataComplete = deleteDataComplete.bind(this);
        Promise.all([LevelDB.deleteData(key)]).then(() => this.loadData()).then(() => boundDeleteDataComplete())
    }

    loadData(){
        const that = this
        return new Promise(function(resolve, reject) {
            Promise.all([LevelDB.getData()]).then((data) => {
                that.data = data[0]
                if (that.isLoaded == false) {
                    that.isLoaded = true
                    that.eventEmitter.emit('tokensLoaded');
                }
                else if (that.isLoaded == true) {
                    that.eventEmitter.emit('tokensUpdated');
                }
                resolve()
            })
        })
    }
}

module.exports = Adapter