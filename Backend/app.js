import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import UserAuthRoutes from './Routes/userAuthRoutes.js'
import connectDB from "./config/db.js";
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));


app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("dev"));


connectDB()

app.get("/",(req,res)=>{
res.send("server is running")
})

app.use("/api/v1/auth",UserAuthRoutes)
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`PSCDB server running on port ${PORT}`);
});