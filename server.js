const express = require("express");
const expressLess = require("express-less");

const app = express();

app.use(express.static("."));

app.use("/styles", expressLess(__dirname + "/less"));

app.listen(3000);