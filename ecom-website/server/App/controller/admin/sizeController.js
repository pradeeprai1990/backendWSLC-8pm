const sizeModel = require("../../model/sizeModel")

let sizeAdd =async (req, res) => {
    let {sizeName,sizeStatus}=req.body

    let insObj={
        sizeName,
       
        sizeStatus
        
    }
    try{
        

        let size=new sizeModel(insObj)
        let insertRes=await size.save()
        let resObj={
            status:1,
            msg:"Size Added",
            insertRes
        }
        res.send(resObj)
    }
    catch(error){
        res.send(error)
    }
}

let sizeView = (req, res) => {
    res.send("size View")
}

let sizeDelete= (req, res)=>{
    res.send("size Delete")
}

let sizeEdit= (req, res)=>{
    res.send("size sizeEdit")
}

module.exports = {sizeAdd,sizeView,sizeDelete,sizeEdit}