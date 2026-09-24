 const mongoose=require("mongoose");

 const foodSchema=new
 mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },

    price:{
        type:Number,
        required:true,
        min:0
    },
    description:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
         
    },
    image:{
        type:String,
    }
 });

 module.exports=mongoose.model("Food",foodSchema);