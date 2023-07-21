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
        console.log("hello");
        const { name, description, price, category, quantity, image } = req.body
        console.log(name, description, price, category, quantity);
        const { photo } = req.files
        console.log(req.files);
      if(photo && photo.size > 1000000) return res.status(500).send({ msg:"photo is required & shouldbe less than 1mb" })  


        //post t cloudinary
// this imagdata come from base 64
// const imageData = Buffer.from(image.split(',')[1], 'base64');
        const imagePath = photo.tempFilePath
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };
      const result = await cloudinary.uploader.upload(imagePath, options);
          console.log(result.url);
          
          if (result?.url)
          {
            try {
                // validation
                switch (true) {
                    case !name: return res.status(500).send({ msg:"name is required" })
                    case !description: return res.status(500).send({ msg:"description is required" })
                    case !price: return res.status(500).send({ msg:"price is required" })
                    case !category: return res.status(500).send({ msg:"category is required" })
                    case !quantity: return res.status(500).send({ msg:"quantity is required" })
                }
                const product = new productModel({...req.body, slug: slugify(name), category: slugify(category), photo:result?.url})
                // if (photo){
                //     product.photo.data = fs.readFileSync(photo.path)
                //     product.photo.contentType = photo.type
                // }
                await product.save()
                return res.status(201).send({
                    success: true,
                    msg: "Product created successfully",
                    upload: "image uploaded successfully",
                    product,
                    image: result.url
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
          }else{
            return res.status(500).send({
                success: false,
                msg: 'error while uploading to cloudinary',
               
            });
          }
}   



//upddate products
export const updateProductController = async (req,res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        // validation
        switch (true) {
            case !name: return res.status(500).send({ msg:"name is required" })
            case !description: return res.status(500).send({ msg:"description is required" })
            case !price: return res.status(500).send({ msg:"price is required" })
            case !category: return res.status(500).send({ msg:"category is required" })
            case !quantity: return res.status(500).send({ msg:"quantity is required" })
            case photo && photo.size > 1000000 : return res.status(500).send({ msg:"photo is required & shouldbe less than 1mb" })  
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug: slugify(name)},
            {new: true})
        if (photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
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
        .select('-photo')
        .limit(12)
        .sort({createdAt: -1})
        if (products){
            res.status(200).send({
                success: true,
                total: products.length,
                msg: "All Products ",
                products,
            })
        }else{
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
        const {slug} =   req.params
        const product = await productModel.findOne({slug: slugify(slug)})
        .select('-photo')
        .populate('category')
        
        if(product){
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
    if(product.photo.data){
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
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
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