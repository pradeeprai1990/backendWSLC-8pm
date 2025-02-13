const adminModel = require("../../model/AdminModel");


let adminLogin=async (req,res)=>{
    let {adminUname,adminPassword}=req.body;
    let adminData=await adminModel.findOne({adminUname,adminPassword})
    if(adminData){
        let obj={
            status:1,
            data:adminData
        }
        res.send(obj)
    }
    else{
        let obj={
            status:0,
            msg:"Invalid userrName or Password.."
        }
        res.send(obj)
    }
}


module.exports={adminLogin}