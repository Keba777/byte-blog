import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));
