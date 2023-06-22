const routes = require("express").Router()
const User = require("../model/User")
routes.get("/fetch",async(req,res)=>{
    try {
        const allUser = await User.find()
        if(allUser.length){
            return res.json({
                message:"Success",
                allUser
            })
        }
        return res.json({
            message:"Success",
            allUser:"No record found"
        })
    } catch (error) {
        throw Error(error.message)
    }
})
routes.post("/post",async(req,res)=>{
    //   console.log(req.body.data)
    const {data} = req.body
    try {
        const user = await User.create(data)
        res.json({
            data:user,
            message:"Success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"error"
        })
    }
})
routes.put("/update/:id",async(req,res)=>{
    try {
        console.log(req.params.id)
        const {name,email,gender} = req.body.values
       const user = await User.findByIdAndUpdate({_id:req.params.id},{name,email,gender},{new:true})
       console.log(user)
       res.json({
        message:"sucess",
        user
       })
    } catch (error) {
        console.log(error)
        if(error.code === 11100){
            return res.status(403).json({
                message:"User already exist"
            })
        }
    }
})
module.exports = routes