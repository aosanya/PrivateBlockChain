const express = require('express')
const Block = require('./Block/Block');
const simplechainapi = require('./SimpleChain/api')
const app = express()
const port = 8000

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
    var data=req.body.body;
    if (data == undefined) {
        res.status = 412;
        res.end("412!");
    }
    else{
        let newBlock = new Block("Test Block");
        simplechainapi.addBlock(newBlock).then((response) => {
            res.send(response)
        })
    }
});


app.use(function(req, res){
    res.status = 404
    res.end("404!")
});

app.listen(port, () => console.log(`SimpleChain listening on port ${port}!`))