import mongoose from "mongoose";

const connDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if (conn) {
      console.log(`MongoDB Connected: ${conn.connection.host} ${conn.connection.name}`);
    } else {
      console.log("MongoDB not Connected");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connDB;
