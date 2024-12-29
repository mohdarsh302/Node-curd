const { Router } = require('express');
import { upload } from '../../modules/student/middleware/uploadMiddleware';
import { authenticateToken } from '../../modules/student/middleware/auth.middleware';
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentDetails,
    postStudentDetails,
    publishPost,
    getPostWithStudent,
    getAllPostData,
    loginStudent,
    myProfile
} =require('./student.controller');

const router = Router();

router.get('/', getAllStudents); // Get all students
router.get('/get/:id', getStudentById); // Get a student by ID
router.post('/', createStudent); // Create a new student
router.put('/put/:id', updateStudent); // Update a student
router.delete('/:id', deleteStudent); // Delete a student
router.get('/get-student-details', getStudentDetails); // Get all students

router.post('/post-student-details', postStudentDetails); // Create a new student

router.post('/create-posts', upload.single('image'), publishPost);
router.get('/get-posts-with-student/:id', getPostWithStudent);
router.get('/get-all-posts', getAllPostData);

router.post('/login/student', loginStudent);
// protected route

router.post('/account/my-profile', authenticateToken, myProfile);
export default router;
