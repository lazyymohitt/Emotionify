const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true 
    }
    ,
    posterUrl :{
        required:true,
        type:String
    },
    title:{
        type:String,
        required:true
    }
}) 

const songModel  =  mongoose.model("songs", songSchema)

module.exports = songModel