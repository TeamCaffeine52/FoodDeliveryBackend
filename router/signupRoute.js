import express from "express";
import cors from "cors";
import { userModel } from "../model/user.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const SignupRouter = express.Router();

SignupRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        image : req.body.image,
        isAdmin : false
    }
    if(userData.firstName && userData.lastName && userData.email && userData.password){
        try {
            const result = await userModel.create(userData);
    
            console.log(result)
            res.send({ message: "Successfully sign up", success: true ,result});
        } catch (error) {
            console.log(error);
            res.send({ message: "Email id is already register", success: false })
        }
    }
    else{
        res.send({ message: "Fill out required fields", success: false })
    }
});

export { SignupRouter };