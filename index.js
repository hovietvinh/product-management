const express = require('express');
const app = express();

// DÙNG .ENV
require("dotenv").config();
const port = process.env.PORT;


// KẾT NỐI DATABASE MONGO
const database = require("./config/database");
database.connect()

// Dùng express-flash (show alert thông báo)
const flash = require('express-flash');
const cookieParser = require("cookie-parser")
const session = require("express-session");
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// Dùng method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

// DÙng body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


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