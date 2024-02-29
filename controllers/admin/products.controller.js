const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index= async (req, res)=>{
    const status = req.query.status;

    const filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Hoạt động ",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        },
    ]
    if(status){
        const index = filterStatus.findIndex(item =>item.status ==status);
        filterStatus[index].class="active"; 
    }else{
        const index = filterStatus.findIndex(item =>item.status =="");
        filterStatus[index].class="active"; 
    }


    let find = {
        deleted:false 
    }
    if(status){
        find.status = status;
    }
    const products = await Product.find(find)
    
    res.render("admin/pages/products/index",{
        pageTitle:"Trang danh sách sản phẩm",
        products:products,
        filterStatus:filterStatus
    })
}