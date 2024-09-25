import mongoose from "mongoose";

export default async function  connectDB(){
    try {
        await mongoose.connect(
          process.env.MONGO_URI!
        );
        const connection= mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB is connected')
        })
        connection.on('error',(err)=>{
            console.log('something went wrong on Mong DB .Please check:'+err)
        })
        console.log("Connected to DB");


      } catch (err) {
        console.log(err);
      }
}