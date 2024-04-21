const express = require("express");
const con = require("./config/dbConnection");
const cors = require("cors");
const mysql = require('mysql2');

const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());



app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/clock", require("./routes/clockRoutes"));
//app.use("/api/weather", require("./routes/weatherRoutes"));
//app.use("/api/news", require("./routes/newsRoutes"));
//app.use("/api/otp", require("./routes/otpRoutes"));
app.all("*", (req, res) => {
    res.status(404).send({ error: "Route not found" })
});
//app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
