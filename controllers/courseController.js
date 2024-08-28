const courseModel = require('../models/courseModel');

const getCourses = async (req, res) => {
    try {
        const courses = await courseModel.getAllCourses();
        res.status(200).json({ data: courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: 'Server error fetching courses.' });
    }
};

const registerCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        const course = await courseModel.findCourseById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        const alreadyRegistered = await courseModel.isCourseRegistered(studentId, courseId);
        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Course already registered.' });
        }

        await courseModel.registerCourse(studentId, courseId);
        res.status(201).json({ message: `Course registered successfully for student ID: ${studentId}` });
    } catch (error) {
        console.error("Error registering course:", error);
        res.status(500).json({ message: 'Server error during course registration.' });
    }
};

const getRegisteredCourses = async (req, res) => {
    const { studentId } = req.query;

    try {
        const registeredCourses = await courseModel.getRegisteredCourses(studentId);
        res.status(200).json(registeredCourses);
    } catch (error) {
        console.error("Error fetching registered courses:", error);
        res.status(500).json({ message: 'Server error fetching registered courses.' });
    }
};

const submitCourses = async (req, res) => {
    const { studentId } = req.body;

    try {
        const registeredCourses = await courseModel.getRegisteredCourses(studentId);

        if (!registeredCourses.length) {
            return res.status(400).json({ message: 'No courses to submit.' });
        }

        await courseModel.submitCourses(studentId);
        res.status(200).json({ message: 'Courses submitted successfully. You can no longer unregister.' });
    } catch (error) {
        console.error("Error submitting courses:", error);
        res.status(500).json({ message: 'Server error during course submission.' });
    }
};

module.exports = {
    getCourses,
    registerCourse,
    getRegisteredCourses,
    submitCourses,  // Export the new submitCourses function
};
