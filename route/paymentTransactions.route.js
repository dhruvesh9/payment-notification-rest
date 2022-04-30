const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const paymentController = require('../controller/payment.controller');

router.get('/', paymentController.payment_list);

router.get('/:id',paymentController.payment_getById);

router.post('/',paymentController.payment_post);

module.exports = router;
