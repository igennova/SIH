const Teacher=require("../Models/teachers")
const getTeacher=async (req,res)=>{
    try {
        const teacher = await Teacher.find(); // Fetch all events from the database
        res.status(200).json(teacher); 
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch teachers', error });
      }
    };


module.exports={getTeacher}