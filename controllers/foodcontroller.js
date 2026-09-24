const mongoose=require("mongoose");
const Food=require("../models/Food");

const createFood= async (req,res)=>{
    try {
    const food= await Food.create(req.body);

    res.status(201).json({
        message:"Food Created successfully",
        food
    }); 
        
    } catch (error) {
        if(error.name === "ValidationError"){
            const messages=Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success:false,
                message:messages 
            }); 
        }
        res.status(500).json({
            message:"Failed to create food",
            error:error.message
        });
    }
};

 const getAllFoods = async (req,res) =>{
    try {
        const { search,category,minPrice,maxPrice,sort,page=1,limit=5 } = req.query;

        let filter = {};

        if(search){
            filter.name = {$regex:search,$options:"i"};
        }

        if(category){
            filter.category = {
                $regex:category,$options:"i"
            };
        }

        if(minPrice || maxPrice){
            filter.price={};

            if(minPrice){
                filter.price.$gte=Number(minPrice);
            }
            if(maxPrice){
                filter.price.$lte=Number(maxPrice);
            }
        }

        const skip =(Number(page)-1)*Number(limit);

         const totalFoods=await
         Food.countDocuments(filter);

         const totalPages=Math.ceil(totalFoods/Number(limit));

        const foods = await Food.find(filter)
        .populate("category","name")
        .sort(sort)
        .skip(skip)
         .limit(Number(limit));

        res.status(200).json({
            success:true,
            totalFoods,
            currentPage:Number(page),
            totalPages,
            limit:Number(limit),
            foods
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
  }; 

const getFoodById= async (req,res)=>{
 try {
    const food=await Food.findById(req.params.id)
    .populate("category","name");

    if(!food){
        res.status(404).json({
            message:"Food not found",
        });
    }
    res.status(200).json({
        message:"Food fetch successfully",
        food
    });
 } catch (error) {
    res.status(500).json({
        message:"Failed to fetch Food",
        error:error.message
    });
 }
    
};

const updateFood=async (req,res)=>{
    try {
        const food=await 
        Food.findByIdAndUpdate(
            req.params.id,
            req.body,
        {new:true,
            runValidators:true
        });
        if(!food){
          return res.status(404).json({
                message:"Food not found"
            });
        }
            res.status(200).json({
                message:"Food updated successfully",
                food
            });
        
    } catch (error) {
        res.status(500).json({
            message:"Failed updated Food",
            error:error.message
        });
    }
};

const deleteFood= async (req,res,next)=>{
    try {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalide Food ID"
            });
        }
        const food=await
        Food.findByIdAndDelete(req.params.id);

        if(!food){
        return res.status(404).json({
            message:"Food not found"
        });
        }

        res.status(200).json({
            message:"Food Deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};



module.exports={createFood,getAllFoods,getFoodById,updateFood,deleteFood};