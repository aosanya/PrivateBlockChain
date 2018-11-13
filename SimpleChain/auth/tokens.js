
class Tokens{
    constructor(){
        this.messageTokens = []
        console.log("Created New Tokens")
    }

    requestValidation(message){
        message.isValid = false
        this.messageTokens.push(message)
        return
    }

    verifyMessage(address, signature){
        const bitcoinMessage = require('bitcoinjs-message')
        const myMessages = this.messageTokens.filter((k) => k.address == address)

        let response = {}
        response.registerStar = true
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
                        response.status.requestTimeStamp = myMessages[i].requestTimeStamp
                        response.status.message = myMessages[i].message
                        response.status.validationWindow = myMessages[i].validationWindow - messageAge
                        response.status.messageSignature = "valid"
                        myMessages[i].isValid = true
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
        console.log(this.messageTokens)
        console.log(address)
        const myMessages = this.messageTokens.filter((k) => k.address == address && k.isValid == true)
        console.log(myMessages)

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