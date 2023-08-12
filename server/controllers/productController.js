import productModel from "../models/productModel.js";
import fs from "fs"
import slugify from "slugify";
import cloudinary from "cloudinary"
import { error } from "console";

// config cloudinary
cloudinary.config({
    cloud_name: 'pdharcloud',
    api_key: '985441353525259',
    api_secret: 'IC9ADGBFiXKJ_7UZjhgXZ0-KRLw'
});

//create a new product
export const createProductController = async (req, res) => {
    console.log("hello", req);
    try {
        const { name, description, price, category, quantity } = req.body
        console.log(name, description, price, category, quantity);
        // validation
        switch (true) {
            case !name: return res.status(500).send({ msg: "name is required" })
            case !description: return res.status(500).send({ msg: "description is required" })
            case !price: return res.status(500).send({ msg: "price is required" })
            case !category: return res.status(500).send({ msg: "category is required" })
            case !quantity: return res.status(500).send({ msg: "quantity is required" })
        }
        const product = new productModel({ ...req.body, slug: slugify(name), category: slugify(category) })
        await product.save()
        return res.status(201).send({
            success: true,
            msg: "Product created successfully",
            product,

        })

    } catch (error) {
        // console.log(req);

        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while creating this product',
            error
        })
    }
}



//post product image
export const createProductImageController = async (req, res) => {
    try {
        console.log("hello", req);

        const { image } = req.files
        console.log(req.files);
        if (image && image.size > 1000000) return res.status(500).send({ msg: "photo is required & shouldbe less than 1mb" })


        const imagePath = image.tempFilePath
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result.url);
        if (result.url) {
            const product = await productModel.findByIdAndUpdate(req.params.pid,
                { photo: result.url },
                { new: true });

            return res.status(201).send({
                success: true,
                msg: "Product updated successfully",
                product,
                upload: "image uploaded successfully",
                image: result.url
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'error while uploading to cloudinary',
            error
        })

    }
}


//upddate products
export const updateProductController = async (req, res) => {
    try {
        console.log(req.params.pid);
        const { name, slug, description, price, category, quantity, shipping } = req.body
        console.log(name, description, price, category, quantity, shipping);

        // validation
        switch (true) {
            case !name: return res.status(500).send({ msg: "name is required" })
            case !description: return res.status(500).send({ msg: "description is required" })
            case !price: return res.status(500).send({ msg: "price is required" })
            case !category: return res.status(500).send({ msg: "category is required" })
            case !quantity: return res.status(500).send({ msg: "quantity is required" })

        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.body, slug: slugify(name) },
            { new: true })

        return res.status(201).send({
            success: true,
            msg: "Product updated successfully",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while updating this product',
            error
        })
    }
}

// get all products
export const getProdductsController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 })
        if (products) {
            res.status(200).send({
                success: true,
                total: products.length,
                msg: "All Products ",
                products,
            })
        } else {
            res.status(404).send({
                success: true,
                total: products.length,
                msg: "there is no product available",
                products
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while getting products',
            error
        })
    }
}

//get  product by name
export const getSingleProdductsController = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug: slugify(slug) })
            .populate('category')
        console.log(product);
        if (product) {
            res.status(200).send({
                success: true,
                msg: "single prodect fetched",
                product
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while getting this products',
            error
        })
    }
}

//get product photo by product id
export const getSingleProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while getting the photo of this product',
            error
        })
    }
}

//delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success: true,
            msg: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while ddeleting this product',
            error
        })
    }
}

// product filtering
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        console.log(checked, radio);
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            msg: 'error while ddeleting this product',
            error
        })
    }
}

//product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            msg: 'error in product count',
            error
        })
    }
}

// product per page
export const productPerPageController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({})
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            msg: 'error in product count',
            error
        })
    }
}