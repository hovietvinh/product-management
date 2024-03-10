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

    // phân trang sản phẩm
    const countProducts = await Product.countDocuments(find);
    const paginationHelper = require("../../helpers/PaginationHelper");
    let objectPagination = paginationHelper(
        {
        currentPage:1,
        limitItems : 4,
        },
        req.query,
        countProducts
    )
   
    

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    
    res.render("admin/pages/products/index",{
        pageTitle:"Trang danh sách sản phẩm",
        products:products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination
    })
}