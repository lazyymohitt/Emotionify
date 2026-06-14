const mongoose  = require("mongoose");


const connectToDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to the Server")
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports  = connectToDB