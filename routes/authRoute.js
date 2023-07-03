import  express  from "express";
import { loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requiredSignedIn } from "../middlewares/authMiddleware.js"


//Router object
 const router = express.Router();

//routing 
//REGISTER  || POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login',loginController)

//middle ware test
router.get('/test', requiredSignedIn, isAdmin,  testController)


// authenticated routes
router.get('/user', requiredSignedIn, (req, res) => {
    res.status(200).send({ok: true}); 
});


export default router;

