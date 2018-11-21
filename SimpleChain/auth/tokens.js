const validationWindow = 1000;
class Tokens{
    constructor(){
        this.messageTokens = []
        this.timeoutRequests = {}

    }

    requestValidation(message){
        //If the user re-submits a request, the application will not add a new request;
        //instead, it will return the same request that it is already in the mempool.
        const existing = this.messageTokens.filter((k) => k.address == message.address)
        if (existing.length == 0){
            message.isValid = false
            this.messageTokens.push(message)
            const that = this
            message.validationWindow = validationWindow
            this.timeoutRequests[message.address]=setTimeout(function(){that.removeValidationRequest(message.address) }, message.validationWindow * 1000);
            return message
        }

        let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
        let messageAge = currentTimeStamp - existing[0].requestTimeStamp
        existing[0].validationWindow = validationWindow - messageAge
        return existing[0]
    }

    removeValidationRequest(address){
        this.messageTokens = this.messageTokens.filter((k) => k.address != address)
        delete this.timeoutRequests[address]
        return
    }

    verifyMessage(address, signature){
        const bitcoinMessage = require('bitcoinjs-message')
        const myMessages = this.messageTokens.filter((k) => k.address == address)

        let response = {}
        response.registerStar = false
        response.status = {}
        response.status.address = address

        if (myMessages.length == 0){
            response.status = "Please request a validtion token at 'requestValidation'"
            return response
        }

        for (var i = 0; i < myMessages.length; i++) {
            let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
            let messageAge = currentTimeStamp - myMessages[i].requestTimeStamp

            let isStale = (messageAge) > myMessages[i].validationWindow

            try{
                let result = bitcoinMessage.verify(myMessages[i].message,address,signature)

                if (result == true){
                    if (isStale == false){
                        response.registerStar = true
                        response.status.requestTimeStamp = myMessages[i].requestTimeStamp
                        response.status.message = myMessages[i].message
                        response.status.validationWindow = myMessages[i].validationWindow - messageAge
                        response.status.messageSignature = "valid"
                    }
                    else{
                        response.status.requestTimeStamp = myMessages[i].requestTimeStamp
                        response.status.message = myMessages[i].message
                        response.status.validationWindow = myMessages[i].validationWindow - messageAge
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
        const myMessages = this.messageTokens.filter((k) => k.address == address && k.isValid == true)

        for (var i = 0; i < myMessages.length; i++) {
            let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
            let messageAge = currentTimeStamp - myMessages[i].requestTimeStamp

            let isStale = (messageAge) > myMessages[i].validationWindow
            if (isStale == false){
                return true
            }
        }
        console.log("Here 2.1")
        return false

    }

}

module.exports = Tokens