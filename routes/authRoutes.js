/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - studentId
 *               - email
 *               - password
 *               - isBlind
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               studentId:
 *                 type: string
 *                 example: S1234567
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               isBlind:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists with that email or student ID
 *       500:
 *         description: Server error during signup
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: User not found or Invalid password
 *       500:
 *         description: Server error during login
 */
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get a list of all available courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses fetched successfully
 *       500:
 *         description: Server error fetching courses
 */

/**
 * @swagger
 * /courses/register:
 *   post:
 *     summary: Register a course for a student
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: S1234567
 *               courseId:
 *                 type: string
 *                 example: C101
 *     responses:
 *       201:
 *         description: Course registered successfully
 *       400:
 *         description: Course already registered or Course not found
 *       500:
 *         description: Server error during course registration
 */

/**
 * @swagger
 * /courses/registered:
 *   get:
 *     summary: Get a list of courses registered by a student
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: List of registered courses fetched successfully
 *       500:
 *         description: Server error fetching registered courses
 */

/**
 * @swagger
 * /courses/submit:
 *   post:
 *     summary: Submit all registered courses for a student
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: S1234567
 *     responses:
 *       200:
 *         description: Courses submitted successfully
 *       400:
 *         description: No courses to submit or error in submission
 *       500:
 *         description: Server error during course submission
 */
/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get a student's results for a specific semester
 *     tags: [Results]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *       - in: query
 *         name: semester
 *         schema:
 *           type: string
 *         required: true
 *         description: The semester identifier (e.g., "2020/2021 First Semester")
 *     responses:
 *       200:
 *         description: Student results fetched successfully
 *       400:
 *         description: Missing student ID or semester
 *       404:
 *         description: No results found for the specified student and semester
 *       500:
 *         description: Server error fetching results
 */


// routes/index.js
const express = require('express');
const { signup, login } = require('../controllers/authController');
const { getCourses, registerCourse, getRegisteredCourses, submitCourses } = require('../controllers/courseController');
const { getStudentResults } = require('../controllers/resultsController'); // Import the new controller function

const router = express.Router();

router.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// Course routes
router.get('/courses', getCourses);
router.post('/courses/register', registerCourse);
router.get('/courses/registered', getRegisteredCourses);
router.post('/courses/submit', submitCourses);

// Results route
router.get('/results', getStudentResults);  // Add route for fetching student results

module.exports = router;

