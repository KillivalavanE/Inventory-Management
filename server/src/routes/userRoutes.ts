import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { getUsers } from "../controllers/userController";

const router = Router()

router.get("/",getUsers)

export default router