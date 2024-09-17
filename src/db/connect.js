import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const URI = `${process.env.MONGODB_URI}/${DB_Name}`;

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection Failed:", error);
    process.exit(1);
  }
};

export default connect;
