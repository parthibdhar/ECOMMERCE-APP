import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/connectDB.js'
import   authRoutes  from './routes/authRoute.js'
import categoryrouter from './routes/categoryRoute.js'
import cors from "cors"
import productRouter from './routes/productRoutes.js'
// env config
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryrouter)
app.use('/api/v1/products', productRouter)

//rest api
app.get('/', (req, res) => {
        res.send(
            "<h1>Welcome to ecommer app MERN STACK</h1>"

        )
    })
    //PORT
const PORT = process.env.PORT || 3030
    //run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgCyan.white)
})