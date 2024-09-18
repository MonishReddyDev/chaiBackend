import dotenv from "dotenv";
import connect from "./db/connect.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT;

connect()
  .then(() => {
    app.listen(port || 8000, () => {
      console.log(`Serve is running at port:${port}`);
    });
  })
  .catch(() => {
    console.log("MONGO db connection failed");
  });
