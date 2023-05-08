import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { verifyToken as cAuth } from "./middleware/customerAuthentication.js";
import { verifyToken as aAuth } from "./middleware/adminAuthentication.js";
import { SignupRouter } from "./router/signupRoute.js";
import { LoginRouter } from "./router/loginRouter.js";
import { HomeRouter } from "./router/homeRouter.js";
import { OrderRouter } from "./router/orderRouter.js";
import { LoginRouter as adminLoginRouter} from "./router/admin/loginRouter.js";
import { HomeRouter as adminHomeRouter } from "./router/admin/homeRouter.js";
import { OrderRouter as adminOrderRouter } from "./router/admin/orderRouter.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

//Routes
// Customer
app.use(LoginRouter);
app.use(SignupRouter);
app.use(HomeRouter);
app.use(OrderRouter);

// Admin
app.use('/admin', adminLoginRouter);
app.use('/admin', adminHomeRouter);
app.use('/admin', adminOrderRouter);


//mongodb connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Connected to Database")

		//server is running
		app.listen(PORT, () => console.log("server is running at port : http://localhost:" + PORT));
	}).catch((err) => {
		console.log(err, "problem to connect with db")
	});


//api
app.get("/", (req, res) => {
  	res.send("Server is running");
});





































//sign up

  //product section

//   const schemaProduct = mongoose.Schema({
//     name: String,
//     category: String,
//     image: String,
//     price: String,
//     description: String,
//   });
//   const productModel = mongoose.model("product", schemaProduct)



  //save product in data 
  //api
//   app.post("/uploadProduct", async (req, res) => {
//     // console.log(req.body)
//     const data = await productModel(req.body)
//     const datasave = await data.save()
//     res.send({ message: "Upload successfully" })
//   })

//   //
//   app.get("/product", async (req, res) => {
//     const data = await productModel.find({})
//     res.send(JSON.stringify(data))
//   })

  /*****payment getWay */
  //console.log(process.env.STRIPE_SECRET_KEY)


  //const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//   app.post("/create-checkout-session", async (req, res) => {

//     try {
//       const params = {
//         submit_type: 'pay',
//         mode: "payment",
//         payment_method_types: ['card'],
//         billing_address_collection: "auto",
//         shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],

//         line_items: req.body.map((item) => {
//           return {
//             price_data: {
//               currency: "inr",
//               product_data: {
//                 name: item.name,
//                 // images : [item.image]
//               },
//               unit_amount: item.price * 100,
//             },
//             adjustable_quantity: {
//               enabled: true,
//               minimum: 1,
//             },
//             quantity: item.qty
//           }
//         }),

//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,

//       }


//       const session = await stripe.checkout.sessions.create(params)
//       // console.log(session)
//       res.status(200).json(session.id)
//     }
//     catch (err) {
//       res.status(err.statusCode || 500).json(err.message)
//     }

//   })
