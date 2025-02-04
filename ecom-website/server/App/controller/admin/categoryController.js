const categoryModel = require("../../model/categoryModels")
let fs=require("fs")
let categoryAdd =async (req, res) => {
    let {categoryName, categoryDescription,status}=req.body

    let insObj={
        catName:categoryName,
        categoryDesc:categoryDescription,
        catStatus:status,
        
    }
    if(req.file){
        if(req.file.filename){
            insObj['catImage']=req.file.filename
        }
    }


    try{
        

        let category=new categoryModel(insObj)
        let insertRes=await category.save()
        let resObj={
            status:1,
            msg:"Category Added",
            insertRes
        }
        res.send(resObj)
    }
    catch(error){
        res.send(error)
    }
    
    
}

let categoryView = async (req, res) => {
    let categoryData=await categoryModel.find()
    let resObj={
        status:1,
        msg:"Data View",
        data:categoryData,
        staticPath:"uploads/category/"
    }
    res.send(resObj)
}

let categorysigleDelete=async (req, res)=>{
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

let categorymultipleDelete=async (req, res)=>{

    let {allIDS}=req.body; //Array

    for(let id of allIDS){
        let getDeleleData=await categoryModel.findOne({_id:id})

        let imageName=getDeleleData.catImage

        let path=`uploads/category/${imageName}`
        fs.unlinkSync(path)

        //Data Delete From CategoryModel

        let delRes=await categoryModel.deleteOne({_id:id})
    }
   
    let resObj={
        status:1,
        msg:"Data Deleted",
       
    }
    res.send(resObj)
}


let categoryEdit= (req, res)=>{
    res.send("Category categoryEdit")
}

module.exports = {categoryAdd,categoryView,categorysigleDelete,categorymultipleDelete,categoryEdit}

//http://localhost:8080/uploads/category/senior-768w.jpg