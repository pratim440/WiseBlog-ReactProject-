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

app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("Server started successfully");
});
