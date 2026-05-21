// src/index.ts

import express from "express";
import cors from "cors";

import categoryRoutes from "./routes/category";
import speakerRoutes from "./routes/speaker";
import eventRoutes from "./routes/event";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
  });
});

app.use("/categories", categoryRoutes);

app.use("/speakers", speakerRoutes);

app.use("/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});