const express = require('express');
const bodyParser = require('body-parser');
const paymentsRoute = require("./route/paymentTransactions.route");
const generalErrorRoute = require('./route/generalError.route');
const tokenRoute = require('./route/token.route')


const https = require('https');
// const http = require('http');
// const fs = require('fs');

const app = express();
app.use((req,res,next)=>{

    // Logging request details
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/token', tokenRoute)
app.use('/payment/notification',paymentsRoute);
app.use('/',generalErrorRoute);

// app.listen(process.env.PORT || 5000,function(){
//     console.log("node server running on port 5000");
// });


// Listen both http & https ports
const httpsServer = https.createServer({
  // key: fs.readFileSync('C:\\Users\\dhruvesh.navghare\\Downloads\\private.key'),
  // cert: fs.readFileSync('C:\\Users\\dhruvesh.navghare\\Downloads\\certificate.crt'),
}, app);

// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});