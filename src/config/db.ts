//import mysql from 'mysql2/promise';
//import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Student } from '../modules/student/student.model';
import { StudentDetails } from '../modules/student/studentDetails.model';
import { StudentPost } from '../modules/student/studentPost.model';
// dotenv.config();

const sequelize = new Sequelize({
    database: 'nodeDb',
    dialect: 'mysql',
    username: 'root',
    password: 'Admin@123',
    host: 'localhost',
    models: [Student, StudentDetails, StudentPost], // Register models here
    logging: false, // Optional: Disable logging SQL queries in the console
});

export default sequelize;