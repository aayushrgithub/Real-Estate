import express, { urlencoded } from "express"
import mongoose from "mongoose";
import { config } from "dotenv";
import UserRoute from "./routes/User.js"
import UserAuth from "./routes/Auth.js"
import UserListing from "./routes/Listing.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import path from 'path'

const app = express();
app.use(express.json());
app.use(cookieParser());
config({
    path: "./config.env"
})

const __dirname = path.resolve();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

mongoose.connect(process.env.MONGO).then(() => console.log("Database Connected")).catch((err) => console.log(err))


app.use("/api/user", UserRoute);
app.use("/api/auth", UserAuth);
app.use("/api/listing", UserListing);
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})


app.listen(7000, () => console.log("Server running at port 7000"))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.messgage || "Internal Server Error";
    return res.send(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})