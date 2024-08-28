// controllers/resultsController.js
const resultsModel = require('../models/resultsModel');

const getStudentResults = async (req, res) => {
    const { studentId, semester } = req.query;

    if (!studentId || !semester) {
        return res.status(400).json({ error: 'Student ID and semester are required.' });
    }

    try {
        const results = await resultsModel.getStudentResults(studentId, semester);

        if (results.length === 0) {
            return res.status(404).json({ error: 'No results found for the specified student and semester.' });
        }

        res.json({
            student_name: results[0].student_name,
            student_id: results[0].student_id,
            semester: results[0].semester,
            results: results.map(row => ({
                course_code: row.course_code, // make sure this matches the DB schema
                course_name: row.course_name,
                mark: row.mark,
                grade: row.grade,
                grade_points: row.grade_points,
            })),
            gpa: {
                gpcp: results[0].gpcp,
                gpa: results[0].gpa,
                credit_taken: results[0].credit_taken,
                credit_passed: results[0].credit_passed,
            },
        });

    } catch (error) {
        console.error('Error fetching student results:', error);
        res.status(500).json({ message: 'Server error fetching results.' });
    }
};

module.exports = {
    getStudentResults,
};
