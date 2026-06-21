const {Router} = require("express")

const authController = require("../controllers/auth.controller")
const {authUser} = require("../middlewares/auth.middleware")


const authRouter = Router()


authRouter.post("/register",authController.registerUser)

authRouter.post("/login", authController.loginUser)

authRouter.get("/getme",authUser,authController.getMe)


authRouter.get("/logout",authController.logoutUser)



module.exports = authRouter 