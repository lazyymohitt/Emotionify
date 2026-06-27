const jwt = require("jsonwebtoken")
const bcrypt  = require("bcryptjs")

const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");


async function registerUser(req,res) {

    const {username, email, password}  = req.body;

    
    const isUserExist  = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserExist) {
       return  res.status(409).json({
            message:"User Exist with this Email or Username"
        })
    }

    const hashpassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashpassword
    })

    const token = jwt.sign({
        id:user._id,
        user:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.cookie("token",token)

    return res.status(201).json({
        message:"User is Succesfully Registered",

        user:{

            id:user._id,
            username:user.username,
            email:user.email

        }
    })





}

async function loginUser(req,res){

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")

    if(!user){
       return  res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return  res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    }, process.env.JWT_SECRET,{
        expiresIn:"3d"
    })

    res.cookie("token", token)

    return  res.status(200).json({
       message:"User Is Successfully LoggedIn",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}


async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

async function logoutUser(req,res){

    const token = req.cookies.token

    res.clearCookie("token")


    // await blacklistModel.create({
    //     token
    // })
    await redis.set(token,Date.now().toString(),"EX" ,60*60)


    res.status(201).json({
        message:"You're Succesfully Logout"
    })




}


module.exports={
    registerUser,
    loginUser,getMe , logoutUser
}