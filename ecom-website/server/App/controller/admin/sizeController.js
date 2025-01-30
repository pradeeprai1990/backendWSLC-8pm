let sizeAdd = (req, res) => {
    res.send("size Add")
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