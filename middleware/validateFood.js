const joi=require("joi"); 
const Category = require("../models/Category");

const foodSchema=joi.object({
    name:joi.string().required(),
    price:
    joi.number().min(0).required(),
    category:joi.string().required()
});

const validateFood=(req,res,next)=>{
    const {error}=foodSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        });
    }
    next();
};

module.exports=validateFood;