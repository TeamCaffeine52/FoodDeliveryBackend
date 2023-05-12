import express from "express";
import cors from "cors";
import { orderModel } from "../../model/order.js";
import { userModel } from "../../model/user.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const OrderRouter = express.Router();

OrderRouter.post("/getAllOrders", async (req, res) => {
    const allOrders = await orderModel.find();
    res.send(allOrders);
});

OrderRouter.post("/updateOrderStatus", async (req, res) => {
    const { _id, isCompleted } = req.body;

    if(_id)
    {
        const filter = { _id: _id };
        const update =  { 
            // isCompleted : isCompleted,
            isCompleted : true, // force completion
        }
    
        const responseData = {}
        const result = await orderModel.findOneAndUpdate(filter, update, {new: true});

        if(result.isCompleted === true)
        {
            responseData.success = false;
            responseData.message = "Can't Update Order Status";
        } else
        {
            responseData.success = true;
            responseData.message = "Successfully updated Order Status";
        }
    }
    else
    {
        responseData.success = false;
        responseData.message = "Can't Find Order";
    }

    res.send(responseData);
});


export { OrderRouter };