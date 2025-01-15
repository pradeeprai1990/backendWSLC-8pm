let express=require("express");
let cors=require("cors");
const { checkToken } = require("./App/middleware/checkToken");
let app=express()
app.use(cors())
app.use(express.json()) //Frontend  JSON rec...

// app.use(checkToken) //Middleware call

app.get("/news", checkToken,(req,res)=>{


    let obj={
        status:1,
        data:"News Data"
    }
    res.send(obj)
})

app.get("/product",(req,res)=>{

    let obj={
        status:1,
        data:"Product Data"
    }
    res.send(obj)
})


app.post("/login",(req,res)=>{


    console.log(req.body)

    let obj={
        status:1,
        msg:"Login",
        data:req.body
    }
    res.send(obj)
})

app.get("/news/:id?",(req,res)=>{

    let newsId=req.params.id;
    if(newsId!==undefined){
        let obj={
            status:1,
           
            data:"News Details",
            newsId
        }
         res.send(obj)
    }
    else{
        let obj={
            status:1,
           
            data:"All News",
            newsId
        }
         res.send(obj)
    }
    
})

app.get('/user/insert',(req,res)=>{
    console.log(req.query.email)
    let obj={
       status:1,
       msg:"Demo API" 
    }
    res.send(obj)
})


app.get("/news/delete/:newsID?",(req,res)=>{

})

app.listen("8080")