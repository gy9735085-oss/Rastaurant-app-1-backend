class AppError extends Error{
    constructor(messge,statusCode){
        super(messge);
        this.statusCode = statusCode;
    }
} 

module.exports=AppError;