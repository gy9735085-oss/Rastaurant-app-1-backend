 const errorMiddleware=(error,req,res,next)=>{
    if(error.name==="ValidationError"){
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }

    if(error.name==="CastError"){
        return res.status(400).json({
            success:false,
            message:"Invalid ID"
        });
    }
    if(error.code===11000){
        return res.status(400).json({
            success:false,
            message:"Duplicate value"
        });
    } 
    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message
    });
 };


 module.exports=errorMiddleware; 