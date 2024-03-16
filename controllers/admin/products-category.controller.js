
const ProductsCategory = require("../../models/product-category.model")
const { prefixAdmin } = require("../../config/system");
// [GET] admin/products-category
module.exports.index =async (req,res)=>{
    let find = {
        deleted:false
    }

     // filter status
    const filterStatusHelper = require("../../helpers/FilterStatusHelper");
    const filterStatus = filterStatusHelper(req.query);
    //duyet san pham theo status
    const status = req.query.status;
    if(status){
        find.status = status;
    }

     //duyet san pham theo ten
    const SearchHepler = require("../../helpers/Search");
    const objectSearch = SearchHepler(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // SORT products
    let sort ={}
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue
    if(sortKey && sortValue){
        sort[sortKey] = sortValue;
    }else{
        sort.position = "desc";
    }




    const records = await ProductsCategory.find(find).sort(sort)
    res.render("admin/pages/products-category/index",{
        pageTitle:"Danh mục sản phẩm",
        records:records,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword
    })

    
}

// [GET] admin/products-category/create
module.exports.create = (req,res)=>{
    res.render("admin/pages/products-category/create",{
        pageTitle:"Tạo danh mục sản phẩm"
    })
}

// [POST] /admin/products-category/create
module.exports.createPost =async (req,res)=>{
    if(req.body.position ==''){
        const pos = await ProductsCategory.countDocuments({deleted:false});
        req.body.position= pos+1;
    }
    else {
        req.body.position =  parseInt(req.body.position)
    }

    const record = new ProductsCategory(req.body);
    await record.save();
    res.redirect(`${prefixAdmin}/products-category`)
}


// [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus =async (req,res)=>{
    
    const {status,id} = req.params
    await ProductsCategory.updateOne({_id:id},{status:status});
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect("back");
}

module.exports.changeMulti = async (req,res)=>{
    console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    ids.pop()
    switch (type) {
        case "active":
            await ProductsCategory.updateMany({_id:{$in:ids}},{status:"active"})
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phầm thành công!`);

            break;
        case "inactive":
            await ProductsCategory.updateMany({_id:{$in:ids}},{status:"inactive"})
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phầm thành công!`);


            break;
        case "delete-all":
            await ProductsCategory.updateMany({_id:{$in:ids}},{
                deleted:true,
                deletedAt: new Date()
            })
            req.flash('success', `Xóa ${ids.length} sản phầm thành công!`);


            break;
        case "change-position":
          
            for(let i =0;i<ids.length;i++){
                const [id,pos] = ids[i].split("-");
                await ProductsCategory.updateOne({_id:id},{position:pos})
            }
            req.flash('success', `Thay đổi vị trí ${ids.length} sản phầm thành công!`);

            break;
        default:
            break;
    }
    res.redirect("back")
}
