const pool = require('../config/db');

const createCourse = async (course) => {
    const { name, lecturer, creditHours } = course;
    const query = `
        INSERT INTO courses (name, lecturer, credit_hours, is_registered)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, lecturer, creditHours, false];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findCourseById = async (courseId) => {
    const query = `SELECT * FROM courses WHERE id = $1`;
    const result = await pool.query(query, [courseId]);
    return result.rows[0];
};

const registerCourse = async (studentId, courseId) => {
    const query = `
        INSERT INTO course_registrations (student_id, course_id)
        VALUES ($1, $2) RETURNING *;
    `;
    const result = await pool.query(query, [studentId, courseId]);
    return result.rows[0];
};

const getAllCourses = async () => {
    const query = `SELECT * FROM courses`;
    const result = await pool.query(query);
    return result.rows;
};

const isCourseRegistered = async (studentId, courseId) => {
    const query = `
        SELECT * FROM course_registrations 
        WHERE student_id = $1 AND course_id = $2
    `;
    const result = await pool.query(query, [studentId, courseId]);
    return result.rows.length > 0;
};

const getRegisteredCourses = async (studentId) => {
    const query = `
        SELECT c.* FROM courses c
        INNER JOIN course_registrations cr ON c.id = cr.course_id
        WHERE cr.student_id = $1
    `;
    const result = await pool.query(query, [studentId]);
    return result.rows;
};

const submitCourses = async (studentId) => {
    const query = `
        UPDATE course_registrations
        SET is_submitted = true
        WHERE student_id = $1;
    `;

    try {
        await pool.query(query, [studentId]);
    } catch (error) {
        throw new Error("Error submitting courses: " + error.message);
    }
}

module.exports = {
    createCourse,
    findCourseById,
    registerCourse,
    getAllCourses,
    isCourseRegistered,
    getRegisteredCourses,
    submitCourses
};
