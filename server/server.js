import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import path from "path";
import cors from "cors";

// import routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import middleware
// import errorHandler from "./middleware/error.js";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

// Load env vars
dotenv.config();

// Connnect to Database
connectDB();

const app = express();

// Body Parser, allows to accept body data
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize Data
app.use(mongoSanitize());
// prevent XSS attacks
app.use(xss());
// Prevent hpp pollution
app.use(hpp());
// CORS
app.use(cors());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
// Set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Init Middleware
// Has to be after routes, or the controllers cant use the middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server has started on port: ${PORT}, in ${process.env.NODE_ENV}`.yellow
  )
);
