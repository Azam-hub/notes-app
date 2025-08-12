import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import notesRouter from "./routes/notesRoutes.js";

config()
connectDB()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("Api is working!");
})

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRouter);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})