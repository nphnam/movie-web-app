// connect MongoDb with mongoose

import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
            dbName: "movie-app" 

        });
        console.log("Mongo DB connected");

    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}