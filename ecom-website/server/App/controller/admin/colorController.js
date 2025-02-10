
let fs=require("fs")
const colorModel = require("../../model/colorModel")
let colorAdd =async (req, res) => {
    let {colorName, colorCode,colorStatus}=req.body

    let insObj={
        colorName,
        colorCode,
        colorStatus
        
    }
    try{
        

        let color=new colorModel(insObj)
        let insertRes=await color.save()
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

let colorView = async (req, res) => {
    let colorData=await colorModel.find()
    let resObj={
        status:1,
        
        data:colorData,
        
    }
    res.send(resObj)
}

module.exports = {colorAdd,colorView}

//http://localhost:8080/uploads/category/senior-768w.jpg