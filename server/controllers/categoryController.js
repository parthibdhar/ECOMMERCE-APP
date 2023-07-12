import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status(401).send({ msg: 'name is required' });

        const categoryExist = await categoryModel.findOne({ name })
        if (categoryExist) return res.status(200).send({
            success: false,
            msg: 'category already exists'
        });
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            msg: 'category hasbeen created',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: ' creating category failed',
            error
        })
    }
}

// updateCategory Controller
export const upadateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            msg: 'category updated successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'updating category failed',
            error
        })
    }
}


// get all categories
export const getAllCategoryController = async (req, res) => {
    try {
        const allCategories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            msg: 'All Category Listed successfully',
            allCategories
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while getting all categories',
            error
        })
    }
}

//get single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: slugify(req.params.slug) })
        res.status(200).send({
            success: true,
            msg: 'Get single category success',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while getting this category',
            error
        })
    }
}

//delete this category
export const deleteCategoryController = async (req, res) => {
    try {
        const {id} =  req.params
        const category = await categoryModel.findByIdAndDelete(id)
        console.log(category);
        res.status(200).send({
            success: true,
            msg: 'this category has been deleted successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while delete this category',
            error
        })
    }
}