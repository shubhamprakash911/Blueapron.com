const mongoose= require("mongoose")
const productSchema= mongoose.Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    cuisine:{type:String,required:true},
    img:{type:String,require:true},
    rating:{type:Number,require:true,default:1,enum:[1,2,3,4,5]},
    price:{type:Number,required:true},
    type:{type:String,required:true},
    quentity:{type:Number,default:1}
},{versionKey:false});

const productModel= mongoose.model("product",productSchema)

module.exports={productModel}

// {
//     "name":"Burger",
//     "brand":"kfc",
//     "cuisine":"Ameriacan",
//     "img":"https://b.zmtcdn.com/data/pictures/chains/1/171/364f7ce98d396ddabbd374f8c2f84953_o2_featured_v2.jpg?output-format=webp",
//     "rating":4,
//     "price":300,
//     "type":"nonVeg"
// }