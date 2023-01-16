const express=require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const {userRouter}=require("./routes/userRouter")
const {postRouter}=require("./routes/postRouter")

const app=express()
app.use(express.json())
app.use("/user",userRouter)
app.use("/post",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})