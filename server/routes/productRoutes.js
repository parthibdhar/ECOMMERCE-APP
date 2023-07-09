import express from 'express';
import { isAdmin, requiredSignedIn } from '../middlewares/authMiddleware.js';
import {createProductController} from '../controllers/productController.js';

const productRouter = express.Router();

// post product
productRouter.post('/create-product',
    requiredSignedIn,
    isAdmin,
    createProductController);

export default productRouter;  