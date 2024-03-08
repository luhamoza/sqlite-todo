import express from "express";
import db from "./config/database.config";
import todoRouter from "./route";
import cors from "cors";

db.sync().then(() => {
  console.log("Database is connected");
});

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/api/v1", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
