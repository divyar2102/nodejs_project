const express=require('express');
const pasth=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const app=express();

//convert data into json
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//use ejs as the view engine
app.set('view engine','ejs');
//static file
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
//register user
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }
    //check if user already exist
    const existingUser=await collection.findOne({name:data.name});
    if(existingUser)
    {
        res.send("User already exist, Please choose a different username");
    }else{

        //hash password using bcrypt
        const salRounds=10;//no of sal round for bcypt
        const hashedPassword=await bcrypt.hash(data.password,salRounds);
        data.password=hashedPassword;//replace hash password with original pass
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    }
});

//login user
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        //compare the hash password from the data with the plain text
        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            req.send("wrong password");
        }
    }catch{
            res.send("wrong details");
        }
});
const port=5000;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
})