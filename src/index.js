import dotenv from "dotenv";
import connect from "./db/connect.js";

dotenv.config({
  path: "./env",
});

connect();
