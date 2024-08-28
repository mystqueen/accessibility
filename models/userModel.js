const pool = require('../config/db');

const createUser = async (user) => {
    const { fullName, studentId, email, passwordHash, isBlind } = user;
    const query = `
        INSERT INTO users (full_name, student_id, email, password_hash, is_blind)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [fullName, studentId, email, passwordHash, isBlind];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByEmailOrStudentId = async (email, studentId) => {
    const query = `SELECT * FROM users WHERE email = $1 OR student_id = $2`;
    const result = await pool.query(query, [email, studentId]);
    return result.rows[0];
};

const findUserByStudentId = async (studentId) => {
    const query = `SELECT * FROM users WHERE student_id = $1`;
    const result = await pool.query(query, [studentId]);
    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmailOrStudentId,
    findUserByStudentId,
};