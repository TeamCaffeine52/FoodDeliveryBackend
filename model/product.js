import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    productDetails: String,
    productImage: String,
    productQuantity: Number,
    productPrice: Number,

    categoryId: String //    
});

export const productModel = mongoose.model("product", productSchema);