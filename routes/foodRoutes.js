const express=require("express");

const router=express.Router();

const { createFood,getAllFoods,getFoodById,updateFood,deleteFood } =require("../controllers/foodcontroller");
const authMiddleware=require("../middleware/authMiddleware");
const authorize=require("../middleware/authorize");
const validateFood=require("../middleware/validateFood");
const validateFoodUpdate=require("../middleware/validateFoodUpdate");

router.post("/foods",authMiddleware,validateFood,createFood);
router.get("/foods",getAllFoods)
router.get("/foods/:id",getFoodById);
router.put("/foods/:id",authMiddleware,authorize("admin"),validateFoodUpdate,updateFood);
router.delete("/foods/:id",authMiddleware,authorize("admin"),validateFoodUpdate,deleteFood);

module.exports=router;