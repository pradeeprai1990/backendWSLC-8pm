const categoryModel = require("../../model/categoryModels")
let fs=require("fs")
const subcategoryModel = require("../../model/subCategoryModel")
let subcategoryAdd =async (req, res) => {
    let {subCategoryName, subcatDescription,parentCategory,status}=req.body

    let insObj={
        subcategoryName:subCategoryName,
        subcategoryDesc:subcatDescription,
        parentCategory,
        subcategoryStatus:status,   
    }
    if(req.file){
        if(req.file.filename){
            insObj['subcategoryImage']=req.file.filename
        }
    }


    try{
        

        let subcategory=new subcategoryModel(insObj)
        
        subcategoryModel.find({subcategoryName,parentCategory})
        let insertRes=await subcategory.save()
        let resObj={
            status:1,
            msg:"Sub Category Added",
            insertRes
        }
        res.send(resObj)
    }
    catch(error){
        res.send(error)
    }
    
    
}

let subcategoryView = async (req, res) => {
    let subcategoryData=await subcategoryModel.find().populate('parentCategory','catName')
    let resObj={
        status:1,
        msg:"Data View",
        data:subcategoryData,
        staticPath:"uploads/subcategory/"
    }
    res.send(resObj)
}

let subcategorysigleDelete=async (req, res)=>{
    let delid=req.params.id

    //Image Delete From Folder
    let getDeleleData=await categoryModel.findOne({_id:delid})

    let imageName=getDeleleData.catImage

    let path=`uploads/category/${imageName}`
    fs.unlinkSync(path)

    //Data Delete From CategoryModel

    let delRes=await categoryModel.deleteOne({_id:delid})
    let resObj={
        status:1,
        msg:"Data Deleted",
       
    }
    res.send(resObj)
}

let subcategorymultipleDelete=async (req, res)=>{

    let {allIDS}=req.body; //Array

    //Old Code Multiple Delete

    // for(let id of allIDS){
    //     let getDeleleData=await categoryModel.findOne({_id:id})

    //     let imageName=getDeleleData.catImage

    //     let path=`uploads/category/${imageName}`
    //     fs.unlinkSync(path)

    //     //Data Delete From CategoryModel

    //     let delRes=await categoryModel.deleteOne({_id:id})
    // }

    //New Code
    // let getDeleleData=await categoryModel.find({_id:{$in:allIDS}}).select('catImage')

    let getAllImageName=await categoryModel.find({_id:{$in:allIDS}}).select('catImage')

    console.log(getAllImageName)
    //"select catImage from category where _id in (10,11,12)"

    for(let items of getAllImageName){
        let imageName=items.catImage
        let path=`uploads/category/${imageName}`
        fs.unlinkSync(path)
        //Data Delete From CategoryModel
    }

     let delRes=await categoryModel.deleteMany({_id:{$in:allIDS}})
   
    let resObj={
        status:1,
        msg:"Data Deleted",
       
    }
    res.send(resObj)
}


let subcategoryEdit=async (req, res)=>{
    let {id}=req.params;
    let data=await categoryModel.findOne({_id:id})
    let resObj={
        status:1,
        data,
        staticPath:"uploads/category/"
       
    }
    res.send(resObj)
}


let subcategoryUpdate=async (req,res)=>{
    let {id}=req.params;
    let {categoryName, categoryDescription,status}=req.body

    console.log(req.body)
    let upObj={
        catName:categoryName,
        categoryDesc:categoryDescription,
        catStatus:status,
        
    }
    if(req.file){
        if(req.file.filename){
            upObj['catImage']=req.file.filename
        }
    }

    try{
        let category=await categoryModel.updateOne({_id:id},{$set:upObj})
       
        let resObj={
            status:1,
            msg:"Category Updated",
            category
        }
        res.send(resObj)
    }
    catch(error){
        res.send(error)
    }

}


let getParentCategory=async (req,res)=>{
    let data=await categoryModel.find({catStatus:true}).select('catName')
    let resObj={
        status:1,
        data,
       
    }
    res.send(resObj)
}  


module.exports = {getParentCategory,  subcategoryAdd,subcategoryView,subcategorysigleDelete,subcategorymultipleDelete,subcategoryEdit,subcategoryUpdate}

//http://localhost:8080/uploads/subcategory/senior-768w.jpg