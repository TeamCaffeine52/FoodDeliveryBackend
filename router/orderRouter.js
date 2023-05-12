import express from "express";
import cors from "cors";
import { productModel } from "../model/product.js";
import { orderModel } from "../model/order.js";
import { userModel } from "../model/user.js";
import { verifyToken as auth } from "../middleware/customerAuthentication.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const OrderRouter = express.Router();

OrderRouter.get("/getMyOrders", auth, async (req, res) => {
    const allOrders = await orderModel.find({customerId : req.user.userId});
    
    res.send(allOrders);
});


OrderRouter.post("/addOrder", auth, async (req, res) => {
    const { deliveryAddress, items } = req.body;
    console.log(req.user);
    const customerId = req.user.userId;
    const requestedProducts = [];

    if(!deliveryAddress)
    {
        res.send({ message: "Fill out required fields", success: false })
        return;
    }

    const houseCheck = deliveryAddress.hasOwnProperty("houseNo");
    const streetCheck = deliveryAddress.hasOwnProperty("street");
    const landmarkCheck = deliveryAddress.hasOwnProperty("landMark");
    const pincodeCheck = deliveryAddress.hasOwnProperty("pinCode");
    const contactCheck = deliveryAddress.hasOwnProperty("contactNumber");
    
    console.log(req.body);

    if(houseCheck && streetCheck && landmarkCheck && pincodeCheck && contactCheck && items.length > 0)
    {
        try {
            let totalPrice = 0;
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
    
            for(let i=0;i<requestedProducts.length;i++)
            {   
                const filter = { _id: requestedProducts[i]._id };
                const update =  { 
                    productQuantity : requestedProducts[i].productQuantity - items[i].purchasedQuantity
                }
            
                const result = await productModel.findOneAndUpdate(filter, update);
            }
    
            const user = await userModel.findOne({_id: customerId});

            const orderData = {
                customerId,
                totalPrice: totalPrice,
                deliveryAddress:{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    houseNo: deliveryAddress.houseNo,
                    street: deliveryAddress.street,
                    landMark: deliveryAddress.landMark,
                    pinCode: deliveryAddress.pinCode,
                    contactNumber: deliveryAddress.contactNumber,
                    isCompleted: false,
                },
                items,
            };

            orderData.totalPrice = totalPrice;
    
            const result = await orderModel.create(orderData);
    
            res.send({ message: "Order Submitted!", success: true ,result });
        } catch (error) {
            console.log(error);
            res.send({ message: "Failed to submit Order", success: false })
        }
    }
    else{
        res.send({ message: "Fill out required field", success: false })
    }
});


export { OrderRouter };