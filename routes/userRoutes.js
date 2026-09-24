const express=require("express");
const rateLimit=require("express-rate-limit");

const router=express.Router();

const{registerUser,loginUser}=require("../controllers/userController");
const authMiddleware=require("../middleware/authMiddleware");

const authLimiter=rateLimit({
    windowMs:15*60*1000,
    limit:10
});

router.post("/register",authLimiter,registerUser);
router.post("/login",loginUser);
router.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        success:true,
        message:"Protected route accessed",
        user:req.user
    });
});


module.exports=router;