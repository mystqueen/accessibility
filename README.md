# Accessibility School Portal

## Project Overview

This project is an inclusive school portal designed to enhance accessibility for visually impaired students. It features a backend API and two frontend applications for managing course registrations, viewing results, and other student-related activities. The portal is optimized for accessibility with text-to-speech functionality and other adaptive features.

## Technologies Used

### Backend
- **Framework**: Node.js
- **Port**: 3001
- **Description**: The backend handles API requests, manages the database, and ensures data integrity. It is built using Node.js and uses PostgreSQL for database management.

### Frontend
- **File Server Frontend**
  - **Framework**: React
  - **Port**: 3000
  - **Description**: This frontend handles file server-related functionalities, providing an interface for managing files, course registrations, and other academic activities.
  
- **SIP Dashboard Frontend**
  - **Framework**: React
  - **Port**: 5173
  - **Description**: This frontend manages the dashboard interface for the school portal, focusing on providing students with accessible navigation, results, and other information.

## Installation and Setup

### Backend Setup
1. **Install Dependencies**: 
   npm install
2. **Start the Backend Server**:
    node index
The backend server will run on port 3001.

### File Server Frontend Setup (Port 3000)
**Navigate to the Project Directory:**
    cd file-server-frontend
**Install Dependencies:**
    npm install

**Start the Frontend:**
    npm start
The file server frontend will run on port 3000.

### SIP Dashboard Frontend Setup (Port 5173)
**Navigate to the Project Directory:**
    cd sip-dashboard

**Install Dependencies:**
    npm install

**Start the Frontend:**
    npm run dev
### The SIP dashboard frontend will run on port 5173.

### Usage
Once the backend and frontends are running, you can access the different parts of the portal through your web browser:

File Server Frontend: http://localhost:3000
SIP Dashboard Frontend: http://localhost:5173
### Features
Accessibility: The portal includes text-to-speech functionality and other features aimed at enhancing accessibility for visually impaired users.
Course Management: Students can register for courses and manage their academic information.
Results Viewing: Students can view their academic results, GPA, and other relevant information.

### Abstract
This project aims to develop an accessible school portal tailored for visually impaired students, offering features such as text-to-speech for navigation, course registration, and result management. The system is built using Node.js for the backend, handling database interactions and API requests, and React for the frontend, which includes two distinct applications: one for file management and course registration, and another for an interactive dashboard. By providing accessible navigation and user-friendly interfaces, this portal seeks to bridge the gap between visually impaired students and digital educational resources.

### Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your changes.
