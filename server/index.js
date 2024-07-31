import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoutes.js"
import companyRoute from "./routes/companyRoutes.js"
import jobRoute from "./routes/jobRoutes.js"
import applicationRoute from "./routes/applicationRoutes.js"

const app = express();
dotenv.config({})

app.use(express.json());
app.use(urlencoded({ 
  origin:"https://job-portal-ufi4.onrender.com",
  extended: true }));
app.use(cookieParser());
const corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/applications", applicationRoute)

app.listen(process.env.PORT, () => {
    connectDB();
  console.log("server started");
});
