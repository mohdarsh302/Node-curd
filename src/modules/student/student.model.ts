import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { StudentDetails } from './studentDetails.model';
import { StudentPost } from './studentPost.model';

@Table({
    tableName: 'students',
    timestamps: false, // Enable if your table has `createdAt` and `updatedAt` columns
})
export class Student extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string; // Store encrypted password

    // relationship
    @HasOne(() => StudentDetails)
    details?: StudentDetails;

    // Has many relations
    @HasMany(() => StudentPost)
    posts? : StudentPost;
}


