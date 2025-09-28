import express from "express";
import routes from "./routes/todoRoutes.js";
import { connectdb } from "./config/dbconfig.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const conn = process.env.mongo_url;
const app=express();

app.use(cors());


app.use(express.json());

connectdb(conn);

app.use('/api/todos',routes);
app.use('/api/users',userRoutes);

app.listen(5000,()=>{
    console.log("server started")
})
