import express from "express";
import dotenv from 'dotenv';
import connectDB from "./db/db.js";
import cors from 'cors'
import productRouter from "./Routes/productRoute.js";
dotenv.config()

const app = express();
const port = process.env.PORT;
app.use(cors({
  origin: [`http://localhost:5173`]
}))
app.use(express.json())

connectDB();

app.use("/api", productRouter);

app.listen(port,() => {
  console.log(`Listening on port ${port}!`);
});
