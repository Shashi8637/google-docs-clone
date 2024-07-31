import mongoose from "mongoose";

export const connectionDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{dbName:"googleDoc"})
        .then((c)=>{
            console.log(`Database Connected Succesfully on ${c.connection.host}`)
        });

    } catch (error) {
        console.log(error,"Error in connnection on databse");
    }
}