import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/db';

dotenv.config();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Sync Sequelize and start the server
sequelize.sync({ force: false }) // Set force: true to drop and recreate tables for development
    .then(() => {
        console.log('Database connected successfully!');
        //app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err.message);
    });
