import {Product} from "../models/Product.js";
import logger from "../utils/logger.js";


/*
* This method is use to add new product
*/ 
const addProduct = async (req, res, next) => {
    try{
        const url = req.protocol + '://' + req.get('host') + '/uploads/productImages/';

        let productImages = [null,null,null];


        if(req.files.productImage1){
            productImages[0] = url  + req.files.productImage1[0].filename;
        }

        if(req.files.productImage2){
            productImages[1] = url + req.files.productImage2[0].filename;
        } else

        if(req.files.productImage3){
            productImages[2] = url + req.files.productImage3[0].filename;
        }


        const newProduct = await Product.create({
            sku: req.body.sku,
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            description: req.body.description, 
            productImages: productImages 
          });
         
          await newProduct.save().then((result)=>{
              logger.info("Product Added Successfully");
              res.status(200).send({status: "Product added", product:result});
          }).catch((err)=>{
              logger.error("addProduct : " + err.message);
              res.status(500).send({status: "Error with insert product", error: err.message });
          })
    } catch (err){
        logger.error("addProduct : " + err.message); 
    }
      
}; 


/*
* This method is use to find all products 
*/ 
const getAllProducts = async (req, res) => {

    try{
        await Product.find().then((products)=>{
            res.json(products);
        }).catch((err)=>{
            logger.error("getAllProducts : " + err.message);
            res.status(500).send({status: "Error with fetch products", error: err.message });
        });
    }catch (err){
        logger.error("getAllProducts : " + err.message);
    }
   
}


/*
* This method is use update product
*/ 
const updateProductById = async (req, res) => {

    try{

        const {id,sku, name, qty, price, description} = req.body;
        
        const url = req.protocol + '://' + req.get('host') + '/uploads/productImages/';

        // Find product images
        let productImages = await Product.findById(id).then((res)=>{
            return res.productImages
        });


        if(req.files.productImage1){
            productImages[0] = url + req.files.productImage1[0].filename;
        }

        if(req.files.productImage2){
            productImages[1] = url + req.files.productImage2[0].filename;
        } 

        if(req.files.productImage3){
            productImages[2] = url + req.files.productImage3[0].filename;
        }

        const updateProduct = {sku, name, qty, price, description, productImages}
        await Product.findByIdAndUpdate(id, updateProduct).then((result)=>{
            res.status(200).send({status: "Product updated", product:result});
        }).catch((err)=>{
            logger.error("updateProductById : " + err.message);
            res.status(500).send({status: "Error with update product", error: err.message });
        })
    }catch (err){
        logger.error("updateProductById : " + err.message);
    }

    
}


/*
* This method is use to delete a product
*/ 
const deleteProductById = async (req, res) => {
    try{
        let id = req.params.id;

        await Product.findByIdAndDelete(id).then(()=>{
            res.status(200).send({status: "Product Deleted", id: req.params.id});
        }).catch((err)=>{
            logger.error("deleteProductById : " + err.message);
            res.status(500).send({status: "Error with delete product", error: err.message });
        })
    }catch (err){
        logger.error("deleteProductById : " + err.message);
    }
}


export {addProduct, getAllProducts,updateProductById, deleteProductById};