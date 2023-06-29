import { response } from "express";
import { comparedPassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


//resister Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        //validation
        if (!name) return res.send({ error: 'name is required' })
        if (!email) return res.send({ error: 'email is required' })
        if (!password) return res.send({ error: 'password is required' })
        if (!phone) return res.send({ error: 'phone is required' })
        if (!address) return res.send({ error: 'address is required' })

        //existing User
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                msg: 'Already exist  please log in'
            })
        }

        //Register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save()
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
                user:{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
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

export const testController = (req, res) => {
    res.send("kigo suna!!!!")
}
