import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin_model.js';
import Professor from '../models/professor_model.js';



export const adminlogin =async (req,res)=>{
    const{username: name,password}=req.body;
    if(!name || !password){
        return res.status(404).json({error:"Please enter all the fields"});
    }
    try{
        const nameofadmin=await Admin.findOne({name:name});
       
        if(nameofadmin===null){
            return res.status(404).json({message:"No valid admin. Access denied!"});
        }
        // if(username!=nameofadmin.name){
        //     return res.status(404).json({message:"No valid admin. Access denied!"});
        // }
       
        const isMatch=await  bcrypt.compare(password, nameofadmin.password);
        if(!isMatch){
            return res.status(400).json({error:'Wrong credentials'});
        }
       
        const token = jwt.sign({ id: nameofadmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        res.status(200).json({ token ,username: nameofadmin.name});  


    }
    catch(error){
        res.status(500).json({ message: ' Some problem in admin authentication' });
    }
};



export const registeradminmessage =async(req,res)=>{
    res.send("We are in admin registration route");
}

export const registeradmin = async (req, res) => {
    const { name,password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ error: "Please fill out all the fields" });
    }
  
    try {


      const newadmin = new Admin({
        name,
    
        password, 
       
      });
  
      await newadmin.save();
  
      const token = jwt.sign({ id: newadmin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      return res.status(201).json({ token, message: "Admin successfully registered" });
    } catch (error) {
      console.error('Error registering admin:', error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const addProfessor = async (req, res) => {
    try {
      const { name, subject } = req.body;
  
      // Validate request data
      if (!name || !subject) {
        return res.status(400).json({ message: 'Name and subject are required' });
      }
  
      // Create a new professor instance
      const newProfessor = new Professor({
        name,
        subject,
        reviews: [] // Initialize with an empty array for reviews
      });
  
      // Save the professor to the database
      await newProfessor.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Professor added successfully', professor: newProfessor });
    } catch (error) {
      res.status(500).json({ message: 'Error adding professor', error });
    }
  };