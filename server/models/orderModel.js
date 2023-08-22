import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.ObjectId,
            ref: 'products',
        }
    ],
    payment: {
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
        }
    },
    buyer:{ 
        type: mongoose.ObjectId,
            ref: 'users',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
        },




},
    { timestamps: true },
);

export default mongoose.model('Order', orderSchema)