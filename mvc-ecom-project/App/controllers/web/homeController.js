

let homeSlider=(req,res)=>{
    let obj={
        status:1,
        data:"Slider Data"
    }
    res.send(obj)
}

let productNew=(req,res)=>{
    let obj={
        status:1,
        data:"Product Data"
    }
    res.send(obj)
}

let enquirySave=(req,res)=>{
    let obj={
        status:1,
        data:"Enquiry Data"
    }
    res.send(obj)
}

module.exports={homeSlider,productNew,enquirySave}