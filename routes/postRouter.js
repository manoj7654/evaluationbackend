
const express=require("express");
const {Postmodel}=require("../modal/postmodal")
const postRouter=express.Router();
const {authenticate}=require("../middleware/authentication")





postRouter.get("/alldata",async(req,res)=>{
    const query=req.query
    console.log(query)
    try {
        const result=await Postmodel.find(query)

        res.send(result)
        // res.send(result)
    
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
        res.send("something went wrong")
    }
})

postRouter.post("/create",authenticate,async(req,res)=>{
    const body=req.body;
    try {
        const new_post=new Postmodel(body)
        await new_post.save()
        res.send("Post created successfully")
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
    }
})
postRouter.patch("/edit/:id",authenticate,async(req,res)=>{
    const Id=req.params.id;
    const body=req.body;
   
    const post=await Postmodel.findOne({"_id":Id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID;
   
    try {
        if(userID_making_req!==userID_in_post){
            res.send({message:"Your are not authorized"})
        }else{
            await Postmodel.findByIdAndUpdate({_id:Id},body)
            res.send({message:"Post has been updated"})
        }
       
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
    }
})

postRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    const Id=req.params.id;
    
    const post=await Postmodel.findOne({"_id":Id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID;

    try {
        if(userID_making_req!==userID_in_post){
            res.send({message:"Your are not authorized"})
        }else{
            await Postmodel.findByIdAndDelete({_id:Id})
            res.send({message:"Post has been deleted"})
        }
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
    }
})
  

module.exports={postRouter}