const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index= async (req, res)=>{
    let find = {
        deleted:false 
    }
    
    // filter status
    const filterStatusHelper = require("../../helpers/FilterStatusHelper");
    const filterStatus = filterStatusHelper(req.query);

    

    //duyet san pham theo ten
    const SearchHepler = require("../../helpers/Search");
    const objectSearch = SearchHepler(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
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
        keyword:objectSearch.keyword
    })
}