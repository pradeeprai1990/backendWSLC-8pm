const categoryModel = require("../../model/categoryModels")

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

let categoryView = (req, res) => {
    res.send("Category View")
}

let categoryDelete= (req, res)=>{
    res.send("Category Delete")
}

let categoryEdit= (req, res)=>{
    res.send("Category categoryEdit")
}

module.exports = {categoryAdd,categoryView,categoryDelete,categoryEdit}