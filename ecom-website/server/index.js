let express=require('express');
const mongoose = require('mongoose');
let cors=require('cors');
const mainRoute = require('./App/routes/mainRoute');
const multer = require('multer');
require("dotenv").config();
let app=express();
app.use(express.json());
app.use(cors())
app.use(mainRoute)

app.use("/uploads/category",express.static("uploads/category"))

app.use("/uploads/subcategory",express.static("uploads/subcategory"))





mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then(()=>
{
    app.listen(`${process.env.PORT}`) //http://localhost:8080/
}
)