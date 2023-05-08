import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { cleanUserData } from "./utility/cleanUserData.js";
import { userModel } from "./model/user.js";
import { LoginRouter } from "./router/loginRouter.js";
import { verifyToken as auth } from "./middleware/authentication.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(LoginRouter);

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Connected to Database")

		//server is ruuning
		app.listen(PORT, () => console.log("server is running at port : http://localhost:" + PORT));
	}).catch((err) => {
		console.log(err, "problem to connect with db")
	});


//api
app.get("/", auth, (req, res) => {
  	res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
   	console.log(req.body);

  	try {
		const data = await userModel.create({
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			password : req.body.password,
			image : req.body.image,
		});
		console.log(data)
		res.send({ message: "Successfully sign up", success: true ,data});
  	} catch (error) {
		console.log(error);
		res.send({ message: "Email id is already register", success: false })
  	}
});

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
