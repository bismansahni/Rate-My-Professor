import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js'
import admin from './routes/admin.js'
import cors from 'cors';
import multer from 'multer';
import student from './routes/student.js';


dotenv.config();


connectToMongoDB();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer(); 

app.use(cors());  // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/auth',admin);
app.use('/add',student);

app.get('/',(req,res)=>{
    res.send("We are in the main server at the rate my professor")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  


