import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = async()=>{
    try{
        const response = await mongoose.connect(`${process.env.MONGO_URI}`);
        if(response)console.log("connected to DB");

    }catch(error){
        console.log(error);
    }

}

export default conn();