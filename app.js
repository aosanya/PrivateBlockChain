const express = require('express')
const Block = require('./Block/Block');
const simplechainapi = require('./SimpleChain/api')
const jade = require('jade')
const app = express()
const port = 8000

var verificationQueue = [];

//Configure bodyParser as Middleware
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//--

app.get('/', (req, res) => {
    //secure this from injection
    simplechainapi.getStatus().then((status) => {
        res.send(status)
    })
    }
)

app.get('/block/:blockheight', (req, res) => {
    //secure this from injection
    simplechainapi.getBlock(req.params.blockheight).then((block) => {
        res.send(block)
    })
    }
);



app.post('/block',function(req,res){
    let data=req.body;
    if (data == undefined) {
        res.status = 412;
        res.end("412!");
    }
    else{
        let newBlock = new Block(data);
        simplechainapi.addBlock(newBlock).then((response) => {
            res.send(response)
        })
    }
});


app.get('/requestValidation/:address', (req, res) => {
    let address=req.params.address;
    requestValidation(address, res)
    }
);

var requestValidation = function(address,res){
    let response = {};
    response.address = address
    response.requestTimeStamp = new Date().getTime().toString().slice(0,-3);
    response.message = response.address + ":" + response.requestTimeStamp + ":starRegistry";
    response.validationWindow = 3000

    simplechainapi.requestValidation(response).then(() => {
        res.send(response)
    })
};

app.get('/message-signature/:address/:signature(*)', (req, res) => {
    let address=req.params.address;
    let signature=req.params.signature;

    verifyMessage(address, signature, res)
    }
);

var verifyMessage = function(address, signature, res){
    simplechainapi.verifyMessage(address, signature).then((success) => {
        console.log(success)

        res.send(success)
    })
}

app.set('view engine', 'jade');
app.engine('html', jade.__express);
app.engine('template', jade.__express);

app.get('/registar', function(req, res){
    res.render('registar');
});

app.get('/requestValidation', function(req, res){
    res.render('requestValidation');
});

app.post('/requestValidation', function(req, res){
    requestValidation(req.body.Address, res)
});

app.get('/verifyMessage', function(req, res){
    res.render('verifyMessage');
});

app.post('/verifyMessage', (req, res) => {
    let address=req.body.Address;
    let signature=req.body.Signature;
    console.log("-- -- -- -- -- --")
    console.log(address)
    console.log(signature)
    verifyMessage(address, signature, res)
    }
);

app.use(function(req, res){
    res.status = 404
    res.end("404!")
});


app.listen(port, () => console.log(`SimpleChain listening on port ${port}!`))