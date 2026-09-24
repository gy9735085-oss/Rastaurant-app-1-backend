const express=require("express");

const router=express.Router();

const {createOrder, getAllOrders, getOrderById, UpdateOrder, deleteOrder}=require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const authorize=require("../middleware/authorize");

router.post("/orders",authMiddleware,createOrder);
router.get("/",authMiddleware,getAllOrders);
router.get("/order/:id",authMiddleware,getOrderById);
router.put("/order/:id",authMiddleware,UpdateOrder); 
router.delete("/order/:id",authMiddleware,authorize("admin"),deleteOrder);

module.exports=router;