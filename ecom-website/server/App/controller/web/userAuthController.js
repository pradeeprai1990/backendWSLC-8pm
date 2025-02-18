const userModel = require("../../model/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let createUser=async (req,res)=>{
     
    let insertObj=req.body; //

    const salt = bcrypt.genSaltSync(saltRounds); //10
    const password = bcrypt.hashSync(req.body.password, salt);
    
    insertObj['password']=password;

    try{
        let insertUser=new userModel(insertObj)
         let insertRes= await insertUser.save()
         let resObj={
            status:1,
            mgs:"User Created",
            insertRes
         }
         res.send(resObj)
    }
    catch(error){
        let resObj={
            status:0,
            mgs:"Email Id Already Exist...",
            error
         }
         res.send(resObj)
    }

    //User Create
}

let login=async (req,res)=>{



    let loginDataCheckEmail=await userModel.findOne({userEmail:req.body.userEmail})
    if(loginDataCheckEmail){
        let userDbPassword= loginDataCheckEmail.password
                        //pradeep123
        let passwordCheck=bcrypt.compareSync(req.body.password, userDbPassword); // true
        if(passwordCheck){
            let resObj={
                status:1,
                mgs:"Login",
                loginDataCheckEmail
             }
                res.send(resObj)
        }
        else{
            let resObj={
                status:0,
                mgs:"Invalid Password",
                
             }
            res.send(resObj)
        }
    }
    else{
        let resObj={
                    status:0,
                    mgs:"Invalid Email",
                    
                 }
       res.send(resObj)
    }
    res.send("hello")
    // if(loginData){
    //     let resObj={
    //         status:1,
    //         mgs:"User Login",
    //         loginData
    //      }
    //      res.send(resObj)
    // }
    // else{
    //     let resObj={
    //         status:0,
    //         mgs:"Invalid USerName & Password",
    //         loginData
    //      }
    //      res.send(resObj)
    // }
}

module.exports={createUser,login}