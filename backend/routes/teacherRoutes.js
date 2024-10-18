const express=require("express")
const router=express.Router()
const {getTeacher}=require("../controller/teachercontroller")
router.get("/teachers",getTeacher)
module.exports=router
