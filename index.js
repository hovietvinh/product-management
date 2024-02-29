const express = require('express');
const app = express();

// DÙNG .ENV
require("dotenv").config();

// KẾT NỐI DATABASE MONGO
const database = require("./config/database");
database.connect()


const port = process.env.PORT;

// DÙNG PUG 
app.set("views" , "./views");
app.set("view engine" , "pug");

// DÙNG FILE TĨNH
app.use(express.static("public"));

// DÙNG ROUTES
const routes = require("./routes/client/index.route");
routes(app);

app.listen(port,()=>{
    console.log("vao port " + port +" thanh cong");
})