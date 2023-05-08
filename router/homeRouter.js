import express from "express";
import cors from "cors";
import { productModel } from "../model/product.js";
import { categoryModel } from "../model/category.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const HomeRouter = express.Router();

HomeRouter.get("/getAllProducts", async (req, res) => {
    // console.log(req.body);
    
    const allProducts = await productModel.find();
    
    res.send(allProducts);
});

HomeRouter.get("/getAllCategory", async (req, res) => {
    // console.log(req.body);
    
    const allCategory = await categoryModel.find();

    res.send(allCategory)
});


export { HomeRouter };