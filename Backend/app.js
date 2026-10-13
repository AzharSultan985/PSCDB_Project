import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import UserAuthRoutes from './Routes/userAuthRoutes.js'
import StudentRoutes from './Routes/studentRoutes.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Express 4/5 preflight
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("dev"));


connectDB()

app.get("/",(req,res)=>{
res.send("server is running")
})

app.use("/api/v1/auth",UserAuthRoutes)
app.use("/api/v1/lms/student/",StudentRoutes)
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`PSCDB server running on port ${PORT}`);
});