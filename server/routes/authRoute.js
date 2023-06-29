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


export default router;

