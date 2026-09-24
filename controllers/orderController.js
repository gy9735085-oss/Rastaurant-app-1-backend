const { default: mongoose } = require("mongoose");
const Order=require("../models/order");
const AppError=require("../middleware/AppError");

const createOrder=async(req,res)=>{
    try {
        const order=await Order.create({
            user:req.user.id,
            product:req.body.product,
            quantity:req.body.quantity
        });

        res.status(201).json({
            success:true,
            message:"Order created successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        });
    }
};

const getAllOrders=async(req,res)=>{
    try {
        const orders=await Order.find({
            user:req.user.id,
        })
        .populate("user")
        .populate("product");
        
            res.status(200).json({
                success:true,
                message:"Ordes fetch successfully",
                orders
            });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getOrderById=async(req,res,next)=>{
    try {
         if(!mongoose.Types.ObjectId.isValid(req.params)){
            return res.status(400).json({
                success:false,
                message:"Invalid order ID"
            });
         }
        const order=await Order.findById(req.params.id)
        .populate("user")
        .populate("product");
     
        if(!order){
        return next(new AppError("Order not found", 404));
    }

        res.status(200).json({
            success:true,
            message:"Order fetched successfully",
            order
        });
    } catch (error) {
        next(error); 
    }   
};

const UpdateOrder=async(req,res,next)=>{
   try {
    const order=await Order.findById(
        req.params.id
    );

    if(!order){
        return next(new AppError("Order not found", 404));
    }
     if(req.user.role !=="admin" && order.user.toString()!==req.user.id){
        return next(new AppError("Access denied",403));
     }
    if(req.body.status && req.user.role !=="admin"){
        return next(new AppError("Access denied",403));
       }
     
    const UpdatedOrder=await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true,
            runValidators:true
        }
    );
    

    res.status(200).json({
        success:true,
        message:"Order Updated successfully"
    });
   } catch (error) {
       next(error);
   }
};

const deleteOrder=async (req,res)=>{
    try {
        const order=await Order.findByIdAndDelete(req.params.id);

        if(
            req.user.role !=="admin" &&
            order.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }

        res.status(200).json({
            success:true,
            message:"Order Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports={createOrder,getAllOrders,getOrderById,UpdateOrder,deleteOrder};