import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./database/index.js";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 8000;

connectToDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`App served at port: ${port}`);
});
