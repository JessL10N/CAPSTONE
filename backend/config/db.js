import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connesso: ${connect.connection.host}`)
    }catch (error){
        console.log(error)
    }
};

export default connectDB;