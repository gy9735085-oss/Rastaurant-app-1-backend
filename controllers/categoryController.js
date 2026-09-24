const Category=require("../models/Category");

const createCategory=async(req,res)=>{
    try {
        const category=await
        Category.create(req.body);

        res.status(201).json({
            success:true,
            message:"Category created successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports={createCategory};