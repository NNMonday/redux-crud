import express from "express";
import "dotenv/config.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import connectDB from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Redux CRUD");
});

app.use("/users", userRouter);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  connectDB();
  console.log(`Server running on: http://localhost:${port}`);
});
