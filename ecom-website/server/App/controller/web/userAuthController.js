const { transporter } = require("../../config/mailConfig");
const userModel = require("../../model/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;


let sendOTP=async (req,res)=>{
    let data=req.body; //
    let {userEmail}=req.body
        let otp=  (Math.random()*99999).toString().slice(0,4)
        OTPDATA.set("MYOTP",otp)
        const info = await transporter.sendMail({
            from: '"OTP 👻" <pradeep.9997@gmail.com>', // sender address
            to:userEmail , // list of receivers
            subject: "OTP ✔", // Subject line
            text: "OTP", // plain text body
            html: `<b>${otp}</b>`, // html body
          });
          console.log(info)
         let obj={
            status:1,
            msg:"OTP SEND"
         } 
       
        res.send(obj)
}
let createUser=async (req,res)=>{
     
    let insertObj=req.body; //

    let myotp=OTPDATA.get("MYOTP") //mail Send OTP
    let otp=req.body.otp;

    if(myotp==otp){

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
            // OTPDATA.delete()
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

    }
    else{
        let resObj={
            status:0,
            mgs:"Invalid OTP",
            
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
                res.status('200').json(resObj)
        }
        else{
            let resObj={
                status:0,
                mgs:"Invalid Password",
                
             }
             res.status('200').json(resObj)
        }
    }
    else{
        let resObj={
                    status:0,
                    mgs:"Invalid Email",
                    
                 }
                 res.status('200').json(resObj)
    }
   
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

module.exports={createUser,login,sendOTP}