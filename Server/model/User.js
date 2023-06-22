const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    id:{
        type:String
    }
    
})

const User = mongoose.model("User",userSchema)

module.exports = User