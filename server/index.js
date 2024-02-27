const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://patil:0987654321@cluster0.ellsl9j.mongodb.net/dealsdray?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const authRoute = require("./routes/signup");
const employeeRoute = require('./routes/employees');
app.use("/", authRoute);
app.use('/', employeeRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
