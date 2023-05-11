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


OrderRouter.post("/addOrder", auth, async (req, res) => {
    const { deliveryAddress, items } = req.body;
    console.log(req.user);
    const customerId = req.user.userId;

    const requestedProducts = [];

    if(customerId && deliveryAddress && (items.length > 0)){
        try {
            for(let i=0;i<items.length;i++)
            {
                const element = items[i];
                const product = await productModel.findOne({_id: element.productId});
                requestedProducts.push(product);

                if(product.productQuantity < element.purchasedQuantity)
                {
                    res.send({ message: "Invalid Quantity", success: false });
                    return;
                }

                totalPrice += product.productPrice * element.purchasedQuantity;
            }

            let totalPrice = 0;

            for(let i=0;i<requestedProducts.length;i++)
            {   
                const filter = { _id: requestedProducts[i]._id };
                const update =  { 
                    productQuantity : requestedProducts[i].productQuantity - items[i].purchasedQuantity
                }
            
                const result = await productModel.findOneAndUpdate(filter, update);
            }

            orderData.totalPrice = totalPrice;
            console.log(orderData);

            const orderData = {
                customerId, deliveryAddress, items
            };
            
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