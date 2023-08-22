import { response } from "express";
import { comparedPassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";


//resister Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body

        //validation
        if (!name) return res.send({ msg: 'name is required' })
        if (!email) return res.send({ msg: 'email is required' })
        if (!password) return res.send({ msg: 'password is required' })
        if (!phone) return res.send({ msg: 'phone is required' })
        if (!address) return res.send({ msg: 'address is required' })
        if (!question) return res.send({ msg: 'question is required' })

        //existing User
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                msg: 'Already exist  please log in'
            })
        }

        //Register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, question }).save()
        res.status(201).send({
            success: true,
            msg: 'User registered successfully',
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: "Error in Registration",
            error
        })


    }
}


//login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                msg: 'Invalid email or password'
            });
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: 'User not found please register'
            })
        }

        //password match    
        const match = await comparedPassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                msg: 'invalid password',
            })
        }

        //token
        const token = await JWT.sign({ _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            msg: 'login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: "Error in Login",
            error
        })
    }
}


//Forgot Password

export const forgotPasswordController = async (req, res) => {

    try {
        const { email, question, newPassword } = req.body
        if (!email) res.status(400).send({ msg: 'email is requiere' })
        if (!question) res.status(400).send({ msg: 'question is requiere' })
        if (!newPassword) res.status(400).send({ msg: 'newPassword is requiere' })

        //check 
        const user = await userModel.findOne({ email, question })

        // valodation
        if (!user) return res.status(404).send({
            success: false,
            msg: 'Wrong email or answer '
        })
        const hashed = await hashPassword(newPassword)
        await userModel.findOneAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            msg: 'Password has been updated'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'something went wrong',
            error
        })

    }
}

//test controller
export const testController = (req, res) => {
    res.send("kigo suna!!!!")
}


//update profile 
export const UpdateProfileController = async (req, res) => {
    try {
        console.log(req.user);
        const { name, email, password, phone, address } = req.body
        const user = await userModel.findOne({ email })
        console.log(user);
        if (!password && password.length < 6) return res.json({ error: "password must be at least 6 characters" })

        const hashedPassword = password ? await hashPassword(password) : undefined

        // update user
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })

        res.status(200).send({
            success: true,
            msg: 'profile updated',
            updatedUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: "Error while updating profile",
            error
        })
    }
}

// get order
export const getOrderController = async (req, res) => {
    try {
        const buyer = req.user._id;
        console.log(buyer);
const orders = await orderModel.find({buyer})
.populate("products")
.populate("buyer", "name")
res.json(orders)

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: "Error while gwtting orders",
            error
        })
    }
}