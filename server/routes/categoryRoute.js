// import express from 'express';
import express from "express";
import { isAdmin, requiredSignedIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, upadateCategoryController } from '../controllers/categoryController.js';

const categoryrouter = express.Router();



// create categories || post
categoryrouter.post(
    '/create-Category',
    requiredSignedIn,
    isAdmin,
    createCategoryController
)

// Upadate categories || put
categoryrouter.put(
    '/upadate-category/:id',
    requiredSignedIn,
    isAdmin,
    upadateCategoryController
)

// Get All Categories
categoryrouter.get('/getAll-Categories', getAllCategoryController)

// Get Single Category
categoryrouter.get('/getSingle-Category/:slug', getSingleCategoryController)

//delete category
categoryrouter.delete('/delete-Category/:id',
requiredSignedIn,
isAdmin,
deleteCategoryController)


export default categoryrouter;