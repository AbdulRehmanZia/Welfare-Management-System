import mongoose from "mongoose";
// import dotenv from "dotenv"

// dotenv.config({path: "./../../.env"})

export const connectDB = async()=>{
    try {
      console.log("Mongo URI:", process.env.MONGODB_URI); 
      const connectionInstance=  await mongoose.connect("mongodb+srv://bootcamp:Saylani_123@cluster0.7di1ydj.mongodb.net/WMS")
      console.log(`MongoDB connected! Host:${connectionInstance.connection.host}`);
      
    } catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1)
    }
}

export default connectDB