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
        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({
            success:true,
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