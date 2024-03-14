module.exports.connect = async ()=>{
    require("dotenv").config();
    const MONGO_URL = process.env.MONGO_URL;
    try {
        const mongoose = require("mongoose");
        await mongoose.connect(MONGO_URL); 
        console.log("connect success");
    } catch (error) {
        console.log("connect error");        
    }
}