let express=require("express")

let aboutRoutes=express.Router()

aboutRoutes.get("/team",(req,res)=>{
    let obj={
        status:1,
        data:"Team Data"
    }
    res.send(obj)
})
aboutRoutes.get("/faq",(req,res)=>{
    let obj={
        status:1,
        data:"Faq Data"
    }
    res.send(obj)
})



module.exports={aboutRoutes}