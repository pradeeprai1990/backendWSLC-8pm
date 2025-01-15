let http=require("http")

let server=http.createServer((req,res)=>{

    if(req.url=="/"){ //http://localhost:8000
        let obj={
            status:1,
            user:[
                {
                    userName:"Pradeep",
                    email:"pradeep@gmail.com"
                },{
                    userName:"ravi",
                    email:"ravi@gmail.com"  
                }
            ]
        }
        res.end(JSON.stringify(obj))
    }
    if(req.url=="/news"){
        let obj={
            status:1,
            news:[
                {
                    title:"Pradeep",
                    desc:"pradeep@gmail.com"
                },{
                    title:"ravi",
                    desc:"ravi@gmail.com"  
                }
            ]
        }
        res.end(JSON.stringify(obj))
    }
    if(req.url=="/product"){
        let obj={
            status:1,
            product:[
                {
                    title:"Iphone",
                    img:"pradeep@gmail.com"
                },{
                    title:"Vivo",
                    img:"ravi@gmail.com"  
                }
            ]
        }
        res.end(JSON.stringify(obj))

    }

    

})


server.listen("8000")

//http://localhost:8000