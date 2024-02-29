module.exports.connect = async ()=>{
    try {
        const mongoose = require("mongoose");
        await mongoose.connect('mongodb://127.0.0.1:27017/product-management'); 
        console.log("connect success");
    } catch (error) {
        console.log("connect error");        
    }
}