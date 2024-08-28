const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const signup = async (req, res) => {
    const { fullName, studentId, email, password, isBlind } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await userModel.findUserByEmailOrStudentId(email, studentId);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with that email or student ID.' });
        }

        const newUser = await userModel.createUser({
            fullName,
            studentId,
            email,
            passwordHash: hashedPassword,
            isBlind
        });

        res.status(201).json({ message: `User created with ID: ${newUser.id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
};

const login = async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const user = await userModel.findUserByStudentId(studentId);
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password.' });
        }

        // Determine the redirect URL based on whether the user is blind or not
        const redirectUrl = user.is_blind 
            ? `http://localhost:5173/dashboardSimple`
            : `http://localhost:5173/dashboard`;

        // Respond with user information and the redirect URL
        res.json({
            message: 'Login successful!',
            userId: user.id,
            name: user.full_name,
            isBlind: user.is_blind,
            redirectUrl: redirectUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = {
    signup,
    login,
};
