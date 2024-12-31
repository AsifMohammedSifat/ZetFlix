import mongoose from "mongoose";

export async function dbConnect() {
    try{
        const conn = await mongoose.connect(process.env.DATBASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected");
        return conn;
    } catch(err){
        console.log(err);
    }
}