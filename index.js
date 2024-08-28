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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Initialize the database (with added courses table)
async function initializeDatabase() {
    const enableUUIDExtensionQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            full_name VARCHAR(255) NOT NULL,
            student_id VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            programme VARCHAR(255),              -- Field for programme
            level VARCHAR(50),                   -- Field for level
            semester VARCHAR(50),                 -- Field for semester
            number VARCHAR(50),                  -- Field for number
            is_blind BOOLEAN DEFAULT FALSE
        );
    `;

    const createCoursesTableQuery = `
        CREATE TABLE IF NOT EXISTS courses (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            code VARCHAR(50) NOT NULL UNIQUE,   -- Course code (e.g., MATH111)
            name VARCHAR(255) NOT NULL,         -- Course title
            lecturer VARCHAR(255) NOT NULL,
            credit_hours INTEGER NOT NULL,
            is_registered BOOLEAN DEFAULT FALSE
        );
    `;

    const createResultsTableQuery = `
        CREATE TABLE IF NOT EXISTS results (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            student_id UUID REFERENCES users(id) ON DELETE CASCADE,
            course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
            mark INTEGER NOT NULL,              -- Numeric mark (e.g., 85)
            grade VARCHAR(2) NOT NULL,          -- Grade (e.g., A, B+)
            grade_points NUMERIC(4, 2) NOT NULL,-- Grade points (e.g., 11.25)
            semester VARCHAR(50) NOT NULL,      -- Semester identifier (e.g., "2020/2021 First Semester")
            UNIQUE(student_id, course_id, semester)  -- Ensures unique results per student per course per semester
        );
    `;

    const createGpaTableQuery = `
        CREATE TABLE IF NOT EXISTS gpa (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            student_id UUID REFERENCES users(id) ON DELETE CASCADE,
            semester VARCHAR(50) NOT NULL,      -- Semester identifier (e.g., "2020/2021 First Semester")
            gpcp NUMERIC(5, 2) NOT NULL,        -- Grade Points and Credit Points
            gpa NUMERIC(3, 2) NOT NULL,         -- GPA (e.g., 3.89)
            credit_taken INTEGER NOT NULL,      -- Total credits taken
            credit_passed INTEGER NOT NULL,     -- Total credits passed
            UNIQUE(student_id, semester)        -- Ensures unique GPA per student per semester
        );
    `;

    const createRegistrationTableQuery = `
        CREATE TABLE IF NOT EXISTS course_registrations (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            course_id UUID REFERENCES courses(id),
            student_id UUID REFERENCES users(id),
            registration_date TIMESTAMP DEFAULT NOW(),
            is_submitted BOOLEAN DEFAULT FALSE  -- Field to track if the registration is submitted
        );
    `;

    try {
        await pool.query(enableUUIDExtensionQuery);
        await pool.query(createUsersTableQuery);
        await pool.query(createCoursesTableQuery);
        await pool.query(createResultsTableQuery);
        await pool.query(createGpaTableQuery);
        await pool.query(createRegistrationTableQuery);
        console.log("Database initialization complete with support for users, courses, results, and GPA.");
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
}

// Call the database initialization function before starting the server
initializeDatabase().then(() => {
    console.log("Database initialization completed.");
});
