import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
	categoryName: String,
    categoryImage: String
});

export const categoryModel = mongoose.model("category", categorySchema);