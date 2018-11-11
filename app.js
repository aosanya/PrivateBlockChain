const express = require('express')
const jade = require('jade')
const app = express()
const port = 8000
const authRoutes = require('./routes/auth/routes')
const simpleChainRoutes = require('./routes/simpleChain/routes')
const starRoutes = require('./routes/simpleChain/starRegistry/routes')

//Configure bodyParser as Middleware
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//

//Configure Express
app.set('view engine', 'jade');
app.engine('html', jade.__express);
app.engine('template', jade.__express);
//

//Configure Routes
app.use('/', authRoutes);
app.use('/', simpleChainRoutes);
app.use('/', starRoutes);
//

app.use(function(req, res){
    res.status = 404
    res.end("404!")
});


app.listen(port, () => console.log(`SimpleChain listening on port ${port}!`))