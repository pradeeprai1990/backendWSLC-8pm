var jwt = require('jsonwebtoken');
let checkUserLogin=(req,res,next)=>{

    let token=req.headers.authorization;
    let myToken=token.split(" ")[1]
    try{
        var decoded = jwt.verify(myToken, process.env.TOKENKEY);
        req.user=decoded.user._id;
        if(decoded.user){
            next()
        }
    }
    catch{
        res.status(200).json({status:0,msg:"Invalid Token"})
      }
   
  
    //token Check 
    
}

module.exports={checkUserLogin}