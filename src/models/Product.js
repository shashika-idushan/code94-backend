import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: {type:String, required:true},
    name: {type:String, required:true},
    qty: {type:Number, required:true},
    price: {type:Number, required:true},
    description: {type:String, required:true},
    productImages: {type:Array}
})

const Product = mongoose.model("Product", productSchema);

export {Product};