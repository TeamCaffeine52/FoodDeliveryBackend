import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	image: String,
	isAdmin: Boolean
});

//
export const userModel = mongoose.model("user", userSchema);