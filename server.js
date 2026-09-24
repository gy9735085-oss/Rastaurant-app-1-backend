require("dotenv").config();
const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const connectDB=require("./config/db");
const foodRoutes=require("./routes/foodRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const userRoutes=require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes");
const errorMiddleware=require("./middleware/errorMiddleware");
const { connect } = require("mongoose");


const app=express();
app.use((req,res,next)=>{
    Object.defineProperty(req,'query',{
        value:{...req.query},
        writable:true,
        configurable:true,
        enumerable:true,
    });
    next();
});
app.use(hpp()); //
app.use(mongoSanitize()); // app.(mongoSanitize());
app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT=5000;

app.use("/api",foodRoutes);
app.use("/api",categoryRoutes);
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes);
app.use(errorMiddleware);


app.get("/",(req,res)=>{
    res.send("Welcome to FoodHub Restaurant");
});

app.get("/api/foods",(req,res)=>{
    res.json([
        {
            name:"Pizza",
            price:199
        },
        {
            name:"Burger",
            price:99
        }
    ]);
});

connectDB();

app.listen(5000,()=>{ 
    console.log(`Server running on port ${PORT}`);
});