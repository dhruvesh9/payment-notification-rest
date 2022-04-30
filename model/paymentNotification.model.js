const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
    extOrderNo: { type: String, required: true, maxlength: 20 },
    amount: { type: Number, required: true },
    currency: { type: Number, required: true },
    mchtOrderNo: { type: Number, required: true },
    orderNo : {type:String, required:true},
    status: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('NotificationModel', notificationSchema);