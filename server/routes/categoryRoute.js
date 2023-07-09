// import express from 'express';
import  express  from "express";
import { isAdmin, requiredSignedIn } from '../middlewares/authMiddleware.js';
import { createCategoryController } from '../controllers/categoryController.js';

const categoryrouter = express.Router();



// create categories || post
categoryrouter.post('/create-Category,', requiredSignedIn, isAdmin, createCategoryController)

export default categoryrouter;