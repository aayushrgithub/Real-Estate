import express from "express"
import mongoose from "mongoose";
import { config } from "dotenv";

const app = express();
config({
    path: "./config.env"
})
mongoose.connect(process.env.MONGO).then(() => console.log("Database Connected")).catch((err) => console.log(err))

app.listen(7000, () => console.log("Server running at port 7000"))