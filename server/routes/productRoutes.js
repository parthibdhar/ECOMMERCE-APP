import express, { Route } from "express";
import { isAdmin, requiredSignedIn } from "../middlewares/authMiddleware.js";
import {

  createProductController,
  createProductImageController,
  deleteProductController,
  getProdductsController,
  getSingleProdductsController,
  getSingleProductPhotoController,
  productCategoryController,
  productCheckoutController,
  productCountController,
  productFiltersController,
  productPaymentVerificationController,
  productPerPageController,
  productSearchController,
  productSimilarController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const productRouter = express.Router();

// post product
productRouter.post(
  "/create-product",
  requiredSignedIn,
  isAdmin,
  // formidable(),
  createProductController
);

// product image
productRouter.put(
  "/create-product-image/:pid",
  requiredSignedIn,
  isAdmin,
  createProductImageController
);

// updated product
productRouter.put(
  "/update-product/:pid",
  requiredSignedIn,
  isAdmin,
  updateProductController
);

// gett all products
productRouter.get("/get-products", getProdductsController);

// get products by name
productRouter.get("/get-products/:slug", getSingleProdductsController);

//get prodducts photo
productRouter.get("/get-product-photo/:pid", getSingleProductPhotoController);

//delete product
productRouter.delete(
  "/delete-product/:pid",
  requiredSignedIn,
  isAdmin,
  deleteProductController
);

//product filters
productRouter.post("/product-filters", productFiltersController);

//product count
productRouter.get("/product-count", productCountController)

//prduct per page
productRouter.get("/product-list/:page", productPerPageController)

//search product
productRouter.get("/searchProduct/:keyWord", productSearchController)

//similar products
productRouter.get("/similarProduct/:pId/:category", productSimilarController)

//category Wise products
productRouter.get("/pruduct-category/:slug", productCategoryController)

// ----------------------------- PAYMENTS ROUTES -----------------------------

// checkout
productRouter.post("/razorpay/checkout", productCheckoutController)

// payment Verification
productRouter.post("/razorpay/PaymentVerification", productPaymentVerificationController)

// //payment
// productRouter.post("/braintree/payment",
//   requiredSignedIn,
//   braintreePaymentController)

export default productRouter;
