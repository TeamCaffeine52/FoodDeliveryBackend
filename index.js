import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
  	res.send({'data': 'Server is Running'});
});