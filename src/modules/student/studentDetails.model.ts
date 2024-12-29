import { Table, Column, Model, DataType, ForeignKey, BelongsTo  } from 'sequelize-typescript';
import { Student } from './student.model';
import { StudentPost } from './studentPost.model';

@Table({
    tableName: 'student_details',
    timestamps: false, // Enable if your table has `createdAt` and `updatedAt` columns
})
export class StudentDetails extends Model {
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
    address!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dob!: Date; 

    // relationship
    @BelongsTo(() => Student)
    student?: Student;
    
}