const { prefixAdmin } = require("../../config/system");
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
   

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort({position:"desc"})
    
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
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect("back");
}


//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async(req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    ids.pop();
    switch (type) {
        case "active":
            await Product.updateMany({_id:{$in:ids}},{status:"active"})
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phầm thành công!`);

            break;
        case "inactive":
            await Product.updateMany({_id:{$in:ids}},{status:"inactive"})
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phầm thành công!`);


            break;
        case "delete-all":
            await Product.updateMany({_id:{$in:ids}},{
                deleted:true,
                deletedAt: new Date()
            })
            req.flash('success', `Xóa ${ids.length} sản phầm thành công!`);


            break;
        case "change-position":
            console.log(type);
            console.log(ids);
            for(let i =0;i<ids.length;i++){
                const [id,pos] = ids[i].split("-");
                await Product.updateOne({_id:id},{position:pos})
            }
            req.flash('success', `Thay đổi vị trí ${ids.length} sản phầm thành công!`);

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

// [GET] /admin/products/create
module.exports.create = (req,res)=>{
    
    res.render("admin/pages/products/create",{
        pageTitle:"Thêm mới sản phẩm"
    })
}
// [POST] /admin/products/create
module.exports.createPost =async (req,res)=>{
    req.body.price =  parseInt(req.body.price)
    req.body.discountPercentage =  parseInt(req.body.discountPercentage)
    req.body.stock =  parseInt(req.body.stock)
    if(req.body.position ==''){
        const pos = await Product.countDocuments({deleted:false});
        req.body.position= pos;
    }
    else {
        req.body.position =  parseInt(req.body.position)
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`

    }

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${prefixAdmin}/products`)
}


// [GET] /admin/products/edit/:id
module.exports.edit = async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findOne({_id:id,deleted:false});
    res.render("admin/pages/products/edit",{
        pageTitle:"Cập nhật sản phẩm",
        product :product
    })
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res)=>{
    const {id} = req.params;
    req.body.price =  parseInt(req.body.price)
    req.body.discountPercentage =  parseInt(req.body.discountPercentage)
    req.body.stock =  parseInt(req.body.stock)
    req.body.position =  parseInt(req.body.position)
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const product = await Product.updateOne({_id:id},req.body);
    if(product){
        req.flash("success","Cập nhật sản phẩm thành công!");
    }
    else{
        req.flash("error","Cập nhật sản phẩm không thành công!");
    }
    res.redirect("back");
}

// [GET] /admin/products/detail/:id
module.exports.detail = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findOne({_id:id,deleted:false});

    res.render("admin/pages/products/detail",{
        pageTitle:product.title,
        product:product
    });
}