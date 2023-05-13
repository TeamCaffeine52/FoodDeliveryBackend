import express from "express";
import cors from "cors";
import { orderModel } from "../../model/order.js";
import { verifyToken as auth } from "../../middleware/adminAuthentication.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const OrderRouter = express.Router();

OrderRouter.get("/getAllOrders", auth, async (req, res) => {
    const allOrders = await orderModel.find();
    res.send(allOrders);
});

OrderRouter.post("/updateOrderStatus", auth, async (req, res) => {
    const { _id } = req.body;
    const responseData = {};
    console.log("id", _id);

    if(_id)
    {
        const filter = { _id: _id };
        const update =  { 
            // isCompleted : isCompleted,
            isCompleted : true, // force completion
        }
    
        const result = await orderModel.findOneAndUpdate(filter, update, {new: true});
        console.log(result);
        if(result.isCompleted === true)
        {
            responseData.success = true;
            responseData.message = "Successfully updated Order Status";
        } else
        {
            responseData.success = false;
            responseData.message = "Can't Update Order Status";
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