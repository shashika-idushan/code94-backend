import { Router } from "express";
import {addProduct, deleteProductById, getAllProducts, updateProductById} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/fileUploader.js";

const productRouter = Router();

productRouter.route('/getAll').get(protect, getAllProducts);
productRouter.route('/addProduct').post(protect,upload.fields([{ name: 'productImage1' },{ name: 'productImage2' },{ name: 'productImage3' }]), addProduct);
productRouter.route('/updateProductById').put(protect,upload.fields([{ name: 'productImage1' },{ name: 'productImage2' },{ name: 'productImage3' }]),updateProductById);
productRouter.route('/deleteProductById/:id').delete(protect,deleteProductById); 
 
  
export {productRouter}