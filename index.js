const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require('./routes/authRoutes'); // Import your routes
const pool = require('./config/db');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Use authentication routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Initialize the database (unchanged)
async function initializeDatabase() {
    const enableUUIDExtensionQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            full_name VARCHAR(255) NOT NULL,
            student_id VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL
        );
    `;

    try {
        await pool.query(enableUUIDExtensionQuery);
        await pool.query(createUsersTableQuery);
        console.log("Database initialization complete with support for users.");
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
}

// Call the database initialization function before starting the server
initializeDatabase().then(() => {
    console.log("Database initialization completed.");
});
