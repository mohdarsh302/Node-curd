import express from 'express';
import bodyParser from 'body-parser';
import studentRoutes from './modules/student/student.routes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/students', studentRoutes);



export default app;
