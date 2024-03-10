const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index= async (req, res)=>{
    
    // filter status
    const filterStatusHelper = require("../../helpers/FilterStatusHelper");
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted:false 
    }

    //duyet san pham theo ten
    let keyword = "";
    if(req.query.keyword){
        keyword =req.query.keyword;
        const regex = new RegExp(keyword,"i");
        find.title = regex;
    }


    //duyet san pham theo status
    const status = req.query.status;
    if(status){
        find.status = status;
    }
    const products = await Product.find(find)
    
    res.render("admin/pages/products/index",{
        pageTitle:"Trang danh sách sản phẩm",
        products:products,
        filterStatus:filterStatus,
        keyword:keyword
    })
}