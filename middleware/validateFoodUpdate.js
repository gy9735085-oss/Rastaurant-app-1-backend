const joi=require("joi");

const foodUpdateSchema=joi.object({
    name:joi.string(),
    price:joi.number().min(0),
    category:joi.string()
});

const validateFoodUpdate=(req,res,next)=>{
    const{error}=foodUpdateSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        });
    }
    next();
};

module.exports=validateFoodUpdate;