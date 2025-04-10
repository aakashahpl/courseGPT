import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./db";
import userRoute from "./api/user";
import cors from "cors";
import courseRoute from "./api/course"
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use("/user",userRoute);
app.use("/course",courseRoute);

connectToDB();
const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
}) 