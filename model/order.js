import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
	customerId: String, //
    totalPrice: Number,
    deliveryAddress: {
        houseNo: Number,
        street: String,
        landMark: String,
        pinCode: Number,
        contactNumber: String,
    },
    isCompleted: Boolean,
    
    items: [
        {
            productId: String, //
            purchasedQuantity: String
        }
    ]
});

export const orderModel = mongoose.model("order", orderSchema);