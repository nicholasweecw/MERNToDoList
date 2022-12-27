const path = require("path");
const express = require("express");
const app = express();
// Import colors so that can use it anywhere (ie. in db.js)
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
// process.env.PORT: To access port from .env file or else use port 5000
const port = process.env.PORT || 5000;

connectDB();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To link to routes file (i.e. taskRoutes.js)
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Serve static files in expressJS
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
