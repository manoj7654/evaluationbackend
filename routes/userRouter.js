const express=require("express")
const {Usermodel}=require("../modal/userModal")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
require("dotenv").config()





userRouter.post("/create",async(req,res)=>{
    const {name,email,age,password}=req.body
    try {
      
        bcrypt.hash(password, 5, async(err, secure_password)=> {
           if(err){
            console.log(err)
           }else{
            const user=new Usermodel({name,email,age,password:secure_password});
            await user.save();
            res.send({message:"Register done"})
           }
        });
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await Usermodel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({message:"Login Successfuly","token":token})
                }else{
                    res.send("Wrong credential")
                }
            });
        }else{
            res.json("Wrong credential")
        }
    } catch (err) {
        console.log(err);
         console.log({"err":"Something went wrong"})
    }
})



module.exports={userRouter}