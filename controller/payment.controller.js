const PaymentNotificationModel = require('../model/paymentNotification.model');
const Response = require('../utility/response');

const fs = require('fs');

exports.payment_list = function (req, res) {
    // console.log('++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('Payment Notification GET ALL Payments')
    // console.log('--------------------------------------------');
    if (req.query.result === 'success') {

        let data = {}
        data['DateTime'] = `[${new Date().toLocaleString()}] Incoming Request:`
        data['HTTP Method'] = req.method;
        data['URL'] = req.originalUrl;
        data['HTTP Headers'] = req.headers;
        data['Query Params'] = req.query;
        data['Body'] = req.body

        res.send(data);
    } else {
        let data = {}
        data['DateTime'] = `[${new Date().toLocaleString()}] Incoming Request:`
        data['HTTP Method'] = req.method;
        data['URL'] = req.originalUrl;
        data['HTTP Headers'] = req.headers;
        data['Query Params'] = req.query;
        data['Body'] = req.body

        res.send(data);
    }
};

exports.payment_getById = function (req, res) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    console.log('Payment Notification GET Payment By ID')
    console.log(req.params);
    let id = req.params.id;
    let payments = readDataFromStorage();

    let requiredPaymentDetail = null;

    for (let i = 0; i < payments.length; i++) {
        if (payments[i] != undefined && payments[i].mchtOrderNo == id) {
            requiredPaymentDetail = payments[i];
            break;
        }
    }
    console.log('--------------------------------------------');
    res.send(Response.createResponse(null, requiredPaymentDetail));
}

exports.payment_post = function (req, res) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    console.log('Payment Notification POST new payment')
    console.log(req.body);

    let data = {}
    data['DateTime'] = `[${new Date().toLocaleString()}] Incoming Request:`
    data['HTTP Method'] = req.method;
    data['URL'] = req.originalUrl;
    data['HTTP Headers'] = req.headers;
    data['Query Params'] = req.query;
    data['Body'] = req.body

    res.send(data);
}

readDataFromStorage = function () {
    let rawdata = fs.readFileSync('paymentStorage.json');
    let payments = JSON.parse(rawdata);
    // console.log(payments);
    return payments;
}

writeDataIntoStorage = function (payments) {
    let data = JSON.stringify(payments);
    fs.writeFileSync('paymentStorage.json', data);
}