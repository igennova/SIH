const express=require("express")
const router=express.Router()
const {register,setAvatar, login}=require("../controller/usercontollers")
router.post("/register",register)
router.post("/setavatar/:id",setAvatar)
router.post("/login",login)
module.exports=router