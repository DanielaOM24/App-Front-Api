import mongoose from "mongoose";

const MONGO_URI= process.env.MONGO_URI || "";

if (!MONGO_URI){
    console.log('error in conection')
}



export async function MongoConection(){
    try{
        await mongoose.connect(MONGO_URI)
        console.log('ere conect')
    }catch(error){
        console.log("ther is not conection to mongoDB", error)
    }
}