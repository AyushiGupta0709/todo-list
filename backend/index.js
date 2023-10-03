const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const connectDb= require("./connection/db");
const routes=require("./routes/todoRputes");
require('dotenv').config();
const app=express();
const PORT= process.env.port || 5000;
connectDb();
app.use(express.json());
app.use(cors())
app.use(routes);
app.listen(PORT,()=>{
    console.log(`Listening to port number ${PORT}`);
})