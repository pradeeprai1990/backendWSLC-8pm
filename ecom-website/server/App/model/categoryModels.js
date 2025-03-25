let mongoose=require('mongoose');
const slugify = require('slugify');

let categorySchema=new mongoose.Schema(
{
    catName:{
        type:String,
        required:true,
       
    },
    slug: {
        type: String,
        unique: true
      },
    catImage:String,   
    categoryDesc:String,
    catStatus:Boolean
},{
    timestamps:true
})


// Pre-save middleware to generate unique slugs
categorySchema.pre('save', async function (next) {
    if (!this.isModified('catName')) {
      return next(); // Skip if title hasn't changed
    }  
    let slug = slugify(this.catName, { lower: true, strict: true });
    let categoryBlog = await this.constructor.findOne({ slug });
    let count = 1;
  
    // Check for uniqueness and append count if needed
    while (categoryBlog) {
      slug = `${slugify(this.catName, { lower: true, strict: true })}-${count}`;
      categoryBlog = await this.constructor.findOne({ slug });
      count++;
    }  
    this.slug = slug;
    next();
});
let categoryModel=mongoose.model("category",categorySchema)
module.exports=categoryModel;