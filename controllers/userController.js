const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
   try {
    const {name,email,password}=req.body;

    const hashedPassword=await
    bcrypt.hash(password,10);

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    });

    user.password=undefined;
      
    res.status(201).json({
        success:true,
        message:"User registered succssfully",
        user
    });
   } catch (error) {
    if(error.code === 11000){
        return res.status(400).json({
            success:false,
            message:"Email already exists"
        });
    }
    res.status(500).json({
    success:false,
    message:error.message
    });
   }
};

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }

        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});

        res.status(200).json({
            message:"Login successfuly",
            token
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports={registerUser,loginUser};