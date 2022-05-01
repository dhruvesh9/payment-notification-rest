const PaymentNotificationModel = require('../model/paymentNotification.model');
const Response = require('../utility/response');

const fs = require('fs');

exports.payment_list = function (req, res) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    console.log('Payment Notification GET ALL Payments')
    console.log('--------------------------------------------');
    res.send(Response.createResponse(null, readDataFromStorage()));
    
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

    if (req.body != undefined) {
        let payments = readDataFromStorage();

        let newPayment = new PaymentNotificationModel({
            extOrderNo: req.body.extOrderNo,
            amount: req.body.amount,
            currency: req.body.currency,
            mchtOrderNo: req.body.mchtOrderNo,
            orderNo: req.body.orderNo,
            status: req.body.status
        });

        payments.push(newPayment);
        writeDataIntoStorage(payments);
        console.log('--------------------------------------------');
        res.send(Response.createResponse(null, payments));
    }else{
        console.log('--------------------------------------------');
        res.send(Response.createResponse(null, "NOT POSTED, request body empty" + req.body));
    }
}

readDataFromStorage = function () {
    let rawdata = fs.readFileSync('paymentStorage.json');
    let payments = JSON.parse(rawdata);
    console.log(payments);
    return payments;
}

writeDataIntoStorage = function (payments) {
    let data = JSON.stringify(payments);
    fs.writeFileSync('paymentStorage.json', data);
}