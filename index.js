const express = require('express');
const bodyParser = require('body-parser');
const paymentsRoute = require("./route/paymentTransactions.route");
const generalErrorRoute = require('./route/generalError.route');

const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/payment/notification',paymentsRoute);
app.use('/',generalErrorRoute);

app.listen(process.env.PORT || 5000,function(){
    console.log("node server running on port 5000");
});