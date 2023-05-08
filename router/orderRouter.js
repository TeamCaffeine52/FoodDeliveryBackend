import express from "express";
import cors from "cors";
import { productModel } from "../model/product.js";
import { orderModel } from "../model/order.js";
import { verifyToken as auth } from "../middleware/authentication.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const OrderRouter = express.Router();

OrderRouter.get("/getMyOrders", auth , async (req, res) => {
    // console.log(req.user);
    const allOrders = await orderModel.find({customerId : req.user.userId});

    res.send(allOrders);
});



export { OrderRouter };