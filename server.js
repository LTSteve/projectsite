const express = require("express");
const handlebars = require("express-handlebars");
const expressLess = require("express-less");

const app = express();

app.use(express.static("public"));

app.use("/styles", expressLess(__dirname + "/less"));

app.engine("handlebars",handlebars.engine());
app.set("view engine", "handlebars");
app.set("views","./views");

app.get("/", (req,res,next)=>{
    res.render("index");
});

app.listen(3000);