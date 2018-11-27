const Adapter = require('./storageAdapters/levelDb/Adapter')
const validationWindow = 1000;
class Tokens{
    constructor(){
        this.storageAdapter = new Adapter();
        this.messageTokens = []
        // Code sequence important : First wire events then load data
        this.wireEvents()
        this.storageAdapter.loadData()
        //
        this.timeoutRequests = {}
    }

    wireEvents(){
        this.storageAdapter.eventEmitter.on('tokensLoaded', () => {
          this.tokensLoaded()
        })

        this.storageAdapter.eventEmitter.on('tokensUpdated', () => {
            this.tokensUpdated()
          })

        this.storageAdapter.eventEmitter.on('tokenAdded', (token) => {
            this.tokenAdded(token)
        })

        this.storageAdapter.eventEmitter.on('tokenUpdated', (token) => {
            this.tokenUpdated(token)
        })

        this.storageAdapter.eventEmitter.on('tokenDeleted', (token) => {
            this.tokenDeleted()
        })

    }

    // Triggered when the tokens are initially loaded
    tokensLoaded(){

        this.messageTokens = this.storageAdapter.data

        for (var i = 0; i < this.messageTokens.length; i++) {
            this.queueTokenRemoval(this.messageTokens[i].value)
        }
    }

    // Triggered when the tokens are updated
    tokensUpdated(){

        this.messageTokens = this.storageAdapter.data
    }

    // Triggered when a new token is added
    tokenAdded(token){
        this.queueTokenRemoval(token)
    }

    // Triggered when a token is updated
    tokenUpdated(token){

    }

    // Triggered when a new token is deleted
    tokenDeleted(){

    }

    queueTokenRemoval(token){
        const that = this
        let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
        let messageAge = currentTimeStamp - token.requestTimeStamp

        let timer = token.validationWindow - messageAge


        if (timer > 0){
            this.timeoutRequests[token.address]=setTimeout(function(){that.removeValidationRequest(token.address) }, timer * 1000);
        }
        else{
            that.removeValidationRequest(token.address)
        }
    }

    requestValidation(message){
        //If the user re-submits a request, the application will not add a new request;
        //instead, it will return the same request that it is already in the mempool.
        const existing = this.messageTokens.filter((k) => k.value.address == message.address)
        if (existing.length == 0){
            const that = this
            message.validationWindow = validationWindow
            message.valid = false
            this.storageAdapter.addData(message)
            return message
        }

        let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
        let messageAge = currentTimeStamp - existing[0].value.requestTimeStamp
        existing[0].value.validationWindow = validationWindow - messageAge
        return existing[0]
    }

    removeValidationRequest(address){
        let tokens = (this.messageTokens.filter((k) => k.value.address == address))

        if (tokens.length == 0){
            return
        }

        this.storageAdapter.deleteData(address)
        //delete this.timeoutRequests[address]
        return
    }

    verifyMessage(address, signature){
        const bitcoinMessage = require('bitcoinjs-message')
        const myMessages = this.messageTokens.filter((k) => k.value.address == address)

        let response = {}
        response.registerStar = false
        response.status = {}
        response.status.address = address

        if (myMessages.length == 0){
            response.status = "Please request a validtion token at 'requestValidation'"
            return response
        }

        for (var i = 0; i < myMessages.length; i++) {
            let token = myMessages[i].value
            let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
            let messageAge = currentTimeStamp - token.requestTimeStamp

            let isStale = (messageAge) > token.validationWindow

            try{
                let result = bitcoinMessage.verify(token.message,address,signature)

                if (result == true){
                    if (isStale == false){
                        response.registerStar = true
                        response.status.requestTimeStamp = token.requestTimeStamp
                        response.status.message = token.message
                        response.status.validationWindow = token.validationWindow - messageAge
                        response.status.messageSignature = "valid"
                        token.valid = true
                        this.storageAdapter.updateData(address, token)
                    }
                    else{
                        response.status.requestTimeStamp = token.requestTimeStamp
                        response.status.message = token.message
                        response.status.validationWindow = token.validationWindow - messageAge
                        response.status.messageSignature = "is stale"
                    }

                    return response
                }
            } catch(e) {
                return e.message
            }
        }

        response.status = "No valid tokens were found"

        return response
    }

    isValidated(address){
        const myMessages = this.messageTokens.filter((k) => k.key == address && k.value.valid == true)
        for (var i = 0; i < myMessages.length; i++) {
            let token = myMessages[i].value
            let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
            let messageAge = currentTimeStamp - token.requestTimeStamp

            let isStale = (messageAge) > token.validationWindow
            if (isStale == false){
                return true
            }
        }

        return false
    }

}

module.exports = Tokens