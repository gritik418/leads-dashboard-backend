import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./database/index.js";

const app = express();
const port = process.env.PORT || 8000;

connectToDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App served at port: ${port}`);
});
