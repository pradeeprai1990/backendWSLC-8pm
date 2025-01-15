let express=require("express");
const { homeRoutes } = require("./web/homePageRoutes");
const { aboutRoutes } = require("./web/aboutPageRoutes");
let webRoutes=express.Router();

webRoutes.use("/home",homeRoutes)
webRoutes.use("/about",aboutRoutes)


module.exports={webRoutes}