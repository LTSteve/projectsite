const express = require("express");
const expressLess = require("express-less");

const app = express();

app.use(express.static("."));

app.use("/css", expressLess(__dirname + "/less"));

app.listen(3000);