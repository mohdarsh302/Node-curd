import { Table, Column,Model,DataType,ForeignKey,BelongsTo  } from "sequelize-typescript";
import { Student } from './student.model';
import { StudentDetails } from "./studentDetails.model";

@Table({
    tableName: 'student_posts',
    timestamps: false,
})

export class StudentPost extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;
    
    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    student_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body!: string; 

    // relationship
    @BelongsTo(() => Student)
    student?: Student;
    
}