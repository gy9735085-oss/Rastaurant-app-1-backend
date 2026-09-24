const mongoose=require("mongoose");

const orderSchema=new
    mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

 product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Food",
    required:true
 },

 quantity:{
         type:Number,
         required:true
 },

 status:{
    type:String,
    enum:["pending","confirmed","preparing","delivered"],
    default:"pending"
 }
  });

  module.exports=mongoose.model("Order",orderSchema); 
