import mongoose from "mongoose";

export const connectDB = async(req, res, next) => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`Connected to database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`error in connection: ${error}`.bgRed.black);

    }
}