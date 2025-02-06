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


let categoryEdit=async (req, res)=>{
    let {id}=req.params;
    let data=await categoryModel.findOne({_id:id})
    let resObj={
        status:1,
        data,
        staticPath:"uploads/category/"
       
    }
    res.send(resObj)
}


let categoryUpdate=async (req,res)=>{
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

module.exports = {categoryAdd,categoryView,categorysigleDelete,categorymultipleDelete,categoryEdit,categoryUpdate}

//http://localhost:8080/uploads/category/senior-768w.jpg