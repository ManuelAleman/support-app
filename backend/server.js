const express = require("express");
const connectDb = require("./config/db");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");



require("dotenv").config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/auth", require("./routes/authRoute"));
app.use("/department", require("./routes/departmentRoute"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Node Server is running on ${PORT}`.bgMagenta.white);
  });