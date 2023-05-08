import express from "express";
import cors from "cors";
import { userModel } from "../model/user.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const LoginRouter = express.Router();

//api login
LoginRouter.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email,password } = req.body;
    try {
        const user = await userModel.findOne({ email: email, password: password });
        console.log("user", user);
        if(user)
        {	
            const token = jwt.sign({userId: user._id}, process.env.JWT_KEY, { expiresIn: '1h' });
            
            res.send({
                token,
                user,
                message: "Login Successful",
                success: true
            });
        }
        else
        {
            res.send({
                user,
                message: "Login Failed",
                success: false
            });
        }
        } catch(error) {
            console.log(error);
            console.log("problem to find user at login")
            res.send({
                message:"problem to find user",
                success:false,
            })
        }
    });

export { LoginRouter };