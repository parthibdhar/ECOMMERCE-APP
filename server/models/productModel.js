import mongoose, { Schema } from "mongoose";
import categoryModel from "./categoryModel.js";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type: Boolean
    }

}, {timestamps: true})

export default mongoose.model('Products', productSchema)