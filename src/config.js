//create database connection
const mongoose=require("mongoose");
const connect =mongoose.connect("mongodb://localhost:27017/Login-tut");

//check db connect or not
connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
});
//create a login schema
const LoginSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//collection Part
const collection= new mongoose.model("users",LoginSchema);

module.exports=collection;