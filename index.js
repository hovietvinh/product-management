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

// KHAI BÁO BIẾN TOÀN CỤC 
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// DÙNG ROUTES
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");
routesAdmin(app);
routesClient(app);

app.listen(port,()=>{
    console.log("vao port " + port +" thanh cong");
})