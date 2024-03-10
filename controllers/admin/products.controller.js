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
//[PATCH] /admin/products/change-status/:active/:id
module.exports.changeStatus = async(req,res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id},{status:status});
    res.redirect("back");
}


//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async(req,res)=>{
    console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    ids.pop();
    switch (type) {
        case "active":
            await Product.updateMany({_id:{$in:ids}},{status:"active"})
            break;
        case "inactive":
            await Product.updateMany({_id:{$in:ids}},{status:"inactive"})
            break;
        default:
            break;
    }
    res.redirect("back")
}
// [DELETE] /admin/products/delete/:id
module.exports.deleted = async(req,res)=>{
    const id = req.params.id;
    await Product.updateOne({_id:id},{
        deleted:true,
        deletedAt : new Date()
    });
    
    res.redirect("back")
}
