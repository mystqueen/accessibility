// models/resultsModel.js
const pool = require('../config/db');

const getStudentResults = async (studentId, semester) => {
    const query = `
        SELECT 
            u.full_name AS student_name,
            u.student_id,
            c.name AS course_name,
            r.mark,
            r.grade,
            r.grade_points,
            r.semester,
            g.gpcp,
            g.gpa,
            g.credit_taken,
            g.credit_passed
        FROM 
            results r
        INNER JOIN 
            users u ON r.student_id = u.id
        INNER JOIN 
            courses c ON r.course_id = c.id
        INNER JOIN 
            gpa g ON r.student_id = g.student_id AND r.semester = g.semester
        WHERE 
            u.student_id = $1 AND r.semester = $2
    `;
    
    const result = await pool.query(query, [studentId, semester]);
    return result.rows;
};

module.exports = {
    getStudentResults,
};
