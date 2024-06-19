import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(port);
    {
      console.log(`listening on port ${process.env.PORT}`);
    }
  })
  .catch((e) => {
    console.log("mongodb Connection failed: " + e);
  });
