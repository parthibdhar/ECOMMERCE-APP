import express from "express";
import {
    UpdateProfileController,
    forgotPasswordController,
    loginController,
    registerController,
    testController,
    getOrderController,
    getAllOrderController,
    orderStatusUpdateController
} from "../controllers/authController.js";
import { isAdmin, requiredSignedIn } from "../middlewares/authMiddleware.js"


//Router object
const router = express.Router();

//routing 
//REGISTER  || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

//forgot password || post
router.post('/forgot-password', forgotPasswordController)

//middle ware test
router.get('/test',
    requiredSignedIn,
    isAdmin,
    testController)


// user authenticated routes
router.get('/user',
    requiredSignedIn, (req, res) => {
        res.status(200).send({ ok: true });
    });

// admin authenticated routes

router.get('/admin',
    requiredSignedIn,
    isAdmin, (req, res) => {
        res.status(200).send({ ok: true });
    });

//Update  profile
router.put('/profile', requiredSignedIn,
    UpdateProfileController)

// get users al orders
router.get('/orders',
    requiredSignedIn,
    getOrderController)

// get all orders
router.get('/all-orders',
    requiredSignedIn,
    isAdmin,
    getAllOrderController)

// order status update
router.put('/order-status-update/:orderId',
requiredSignedIn,
isAdmin,
orderStatusUpdateController)

export default router;

