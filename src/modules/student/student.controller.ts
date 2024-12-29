
import { Request, Response } from 'express';
import { Student } from '../student/student.model';
import { StudentDetails } from './studentDetails.model';
import { StudentPost } from './studentPost.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret';
import path from 'path';


// Get all students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await Student.findAll();
        //console.log('hiii => ' +students);
        res.status(200).json(students);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};


// Get a student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const { id } = req.params;
        console.log(id);
        const student = await Student.findByPk(id);
        //res.status(200).json(student);
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.status(200).json(student);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
    
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new student in the database
        const student = await Student.create({
            name,
            email,
            password: hashedPassword, // Save hashed password
        });
        res.status(201).json(student);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        console.log('idd====>' +id);
        const { name, email} = req.body;
        const student = await Student.findByPk(id);
        //const hashedPassword = await bcrypt.hash(password, 10);

        if (!student) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            await student.update({ name, email });
            res.status(200).json(student);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        //res.json({ message: 'Student deleted successfully' });
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            await student.destroy();
            res.status(200).json({message: 'Student deleted successfully'});
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students
export const getStudentDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await Student.findAll({ include: [StudentDetails] });
        console.log('hiii => ' +students);
        res.status(200).json(students);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// store student details

export const postStudentDetails = async(req: Request, res: Response) => {
    const {name, email, password, address, phone, dob} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name:name,
            email:email,
            password:hashedPassword
        });
        const student_details = await StudentDetails.create({
            student_id:student.id,
            address,
            phone,
            dob

        });
        if(!student && !student_details){
            res.status(401).json('Bad request');
        }else{
            const all_students = await Student.findAll({ include:StudentDetails, order: [['id', 'DESC']]});
            res.status(201).json(all_students);
        }
    }catch( error: any){
        res.status(500).json({ error: error.message });
    }
};

// 
// Publish a new post for a student
export const publishPost = async (req: Request, res: Response) => {
    try {
      const { student_id, title, body } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
        }
      // Check if a student exists
      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Get the uploaded file path
      const image = req.file ? req.file.filename : null;
  
      // Create the post
      const post = await StudentPost.create({
        student_id,
        title,
        image,
        body,
      });
  
      res.status(201).json({
        message: 'Post published successfully',
        post,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

export const getPostWithStudent = async(req: Request, res: Response) => {
    try{
        const {id } = req.params;
        console.log(id);
        // Fetch the post along with student and studentDetails
        const post = await StudentPost.findOne({
            where: { id }, // Match post ID
            include: [
                {
                    model: Student, // Include Student
                    attributes: ['name', 'email', 'password'], // Specify which fields to include
                    include: [
                        {
                            model: StudentDetails, // Include StudentDetails
                            attributes: ['address', 'phone', 'dob'], // Specify which fields to include
                        },
                    ],
                },
            ],
        });
        //console.log(post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    }catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPostData = async (req: Request, res: Response) => {
    try {
        const posts = await StudentPost.findAll({
            include:[
                {
                    model:Student,
                    attributes:[ 'name','email'],
                    include:[
                        {
                            model:StudentDetails,
                            attributes: ['address', 'phone', 'dob'],
                        }
                    ]
                }
            ]
        });
        if(!posts) {
            res.status(404).json('Not found posts');
        }
        res.status(201).json(posts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const loginStudent = async (req: Request, res: Response) => {
    try {
        const {email,password} = req.body;
        console.log(email,password);
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const student = await Student.findOne({
            where: { email }
        });
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            { id: student.id, email: student.email }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration
        );
        const student_details = await Student.findOne(
            { where: {email }, 
            attributes:['id','name','email'],
            include:[  
                {
                    model: StudentDetails,
                    attributes:['address','phone','dob'],
                }
            ],
        });
        res.status(200).json({
            message: 'Login successful.',
            token, // Return the token
            // student: {
            //     id: student.id,
            //     name: student.name,
            //     email: student.email,
            // },
            data: student_details
        });
    } catch (error) {
        
    }
}

export const myProfile = async (req:Request, res:Response) => {
    //const { email} = req.body;
    const user = (req as any).user;
    const id = user.id
    const student = await Student.findOne({
        where: {id},
        attributes:['name','email'],
        include:[
            {
                model:StudentDetails
            }
        ]
    });
    if(!student){
        return res.status(404).json({ error: 'Student not found.' });
    }
    return res.status(200).json({ message:"Student Profile", user_data: student });
}