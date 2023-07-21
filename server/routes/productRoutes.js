import express from 'express';
import { isAdmin, requiredSignedIn } from '../middlewares/authMiddleware.js';
import {
    createProductController,
    deleteProductController,
    getProdductsController,
    getSingleProdductsController,
    getSingleProductPhotoController,
    updateProductController,
} from '../controllers/productController.js';
import formidable from 'express-formidable'

const productRouter = express.Router();

// post product
productRouter.post('/create-product',
    // requiredSignedIn,
    // isAdmin,
    // formidable(),
    createProductController);



// updated product
productRouter.put('/update-product/:pid',
    requiredSignedIn,
    isAdmin,
    formidable(),
    updateProductController);

// gett all products
productRouter.get('/get-products', getProdductsController);

// get products by name
productRouter.get('/get-products/:slug', getSingleProdductsController);

//get prodducts photo
productRouter.get('/get-product-photo/:pid', getSingleProductPhotoController);

//delete product
productRouter.delete('/delete-product/:pid', deleteProductController);


export default productRouter;  