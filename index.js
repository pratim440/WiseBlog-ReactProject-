const express = require("express");
const cors = require("cors");
require("./db/conn");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server started successfully");
});
