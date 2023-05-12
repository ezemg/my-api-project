const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const usersRouter = require("./routes/users.js");

// app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my api" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
