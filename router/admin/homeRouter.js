import express from "express";
import cors from "cors";
import { categoryModel } from "../../model/category.js";
import { productModel } from "../../model/product.js";

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

HomeRouter.post("/addCategory", async (req, res) => {
    const { categoryName, categoryImage } = req.body;
    const categoryData = {
        categoryName, categoryImage
    };

    if(categoryName && categoryImage){
        try {
            const result = await categoryModel.create(categoryData);
    
            res.send({ message: "Successfully Added Category", success: true ,result});
        } catch (error) {
            console.log(error);
            res.send({ message: "Category Already Exists", success: false })
        }
    }
    else{
        res.send({ message: "Fill out required fields", success: false })
    }
});

HomeRouter.post("/addProduct", async (req, res) => {
    console.log(req.body);

    const { productName, productDetails, productImage, productQuantity, productPrice, categoryId } = req.body;

    const productData = {
        productName, productDetails, productImage, productQuantity, productPrice, categoryId
    };

    if(productName && productDetails && productImage && productQuantity && productPrice && categoryId){
        try {
            const result = await productModel.create(productData);
    
            console.log(result)
            res.send({ message: "Successfully Added Product", success: true ,result});
        } catch (error) {
            console.log(error);
            res.send({ message: "Product Already Exists", success: false })
        }
    }
    else{
        res.send({ message: "Fill out required fields", success: false })
    }
});

HomeRouter.post("/updateProduct", async (req, res) => {
    const _id = req.body._id;
    const price = req.body.productPrice;
    const stock = req.body.productQuantity;

    const filter = { _id: _id };
    const update =  { 
        productPrice: price, 
        productQuantity: stock 
    }

    const responseData = {}
    const result = await productModel.findOneAndUpdate(filter, update, {new: true});
    
    if(result.productQuantity === update.productPrice && result.productQuantity === update.productQuantity)
    {
        responseData.success = false;
        responseData.message = "Can't Update the Product data";
    } else
    {
        responseData.success = true;
        responseData.message = "Successfully updated Product Details";
    }

    res.send(responseData);

});

export { HomeRouter };