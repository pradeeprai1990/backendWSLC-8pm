let express=require("express")
let cors=require("cors");
const { webRoutes } = require("./App/routes/websiteRoutes");
require("dotenv").config();

let app=express();
app.use(express.json())
app.use(cors())

app.use("/web",webRoutes)

// app.use("/admin",adminRoutes)



app.listen(process.env.PORT || 8100)


//http://localhost:8000/web/home/new-products
//"Home Slider API"


//http://localhost:8000/web/about/team