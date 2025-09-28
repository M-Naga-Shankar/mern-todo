import mongoose from "mongoose";

export const connectdb = async (url)=>{
    try{
      await mongoose.connect(url);
        console.log("db connected");
    }catch(error){
        console.log("eroor",error);
        process.exit(1);
    }
    
}