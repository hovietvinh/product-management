const express = require('express');
const app = express();

// DÙNG .ENV
require("dotenv").config();
const port = process.env.PORT;


// KẾT NỐI DATABASE MONGO
const database = require("./config/database");
database.connect()

// Dùng method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'))


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