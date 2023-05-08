import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
	customerId: String, //
    totalPrice: Number,
    
    items: [
        {
            productId: String, //
            purchasedQuantity: String
        }
    ]
});

export const orderModel = mongoose.model("order", orderSchema);