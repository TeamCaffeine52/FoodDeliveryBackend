import express from "express";
import cors from "cors";
import { productModel } from "../model/product.js";
import { orderModel } from "../model/order.js";
import { verifyToken as auth } from "../middleware/customerAuthentication.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const OrderRouter = express.Router();

OrderRouter.get("/getMyOrders", async (req, res) => {
    // console.log(req.user);
    const allOrders = await orderModel.find({customerId : req.user.userId});

    res.send(allOrders);
});


OrderRouter.post("/addOrder", async (req, res) => {
    const { customerId, deliveryAddress, contactNumber, items } = req.body;

    // customerId = req.user.userId;

    const orderData = {
        customerId, deliveryAddress, contactNumber, items
    };

    if(customerId && deliveryAddress && contactNumber && (items.length > 0)){
        try {
            let totalPrice = 0;
            
            for(let i=0;i<items.length;i++)
            {
                const element = items[i];
                const product = await productModel.findOne({_id: element.productId});
                totalPrice += product.productPrice * element.purchasedQuantity;
            }

            orderData.totalPrice = totalPrice;
            console.log(orderData);

            const result = await orderModel.create(orderData);

            res.send({ message: "Order Submitted!", success: true ,result });
        } catch (error) {
            console.log(error);
            res.send({ message: "Failed to submit Order", success: false })
        }
    }
    else{
        res.send({ message: "Fill out required fields", success: false })
    }
});


export { OrderRouter };