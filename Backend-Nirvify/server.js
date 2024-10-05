// import express from "express";
// import "dotenv/config";
// import connectDB from "./config/mongoDB.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";

// const app = express();
// const port = process.env.PORT || 3000;
// connectDB();
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use("/auth", userRoutes);

// app.listen(port, () => {
//   console.log(`Server is Running on PORT : ${port}..`);
// });

import express from "express";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import episodeRoutes from "./routes/episodeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// Serve static files (uploaded images)
app.use(
  "/uploads/podcast-images",
  express.static(path.join(__dirname, "uploads/podcast-images"))
);

app.use(
  "/uploads/epi-images",
  express.static(path.join(__dirname, "uploads/epi-images"))
);
app.use(
  "/uploads/epi-audios",
  express.static(path.join(__dirname, "uploads/epi-audios"))
);

app.use("/uploads", express.static("uploads"));

app.use("/auth", userRoutes);
app.use("/api/podcast", podcastRoutes); // Use podcast routes
app.use("/api/episode", episodeRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}..`);
});
