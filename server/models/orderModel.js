import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    date: {
        type:  String
    }



},
    { timestamps: true },
);

export default mongoose.model('Order', orderSchema)