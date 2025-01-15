
let myToken=123456
let checkToken=(req,res,next)=>{

    if(req.query.token=="" ||  req.query.token==undefined){
        let obj={
            status:0,
            msg:"Please Enter Your Token"
        }
    
       return  res.send(obj)
    }
    
    if(req.query.token!=myToken){
        let obj={
            status:0,
            msg:"Please Enter Correct Your Token"
        }
    
       return  res.send(obj)
    }

    next()

}

module.exports={checkToken}