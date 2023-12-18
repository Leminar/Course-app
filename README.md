# Course-App Documentation

## Overview
Course-App is a full-stack web application designed to manage educational courses. It allows users to register, login, view, create, edit, and delete course listings. This application is built using Node.js, Express for the backend, and React for the frontend.

## Features

- **User Authentication**: Secure registration and login system.
- **Course Management**: Users can view all courses, and logged-in users can add, edit, or delete courses they created.
- **Responsive Design**: Frontend designed for various screen sizes.

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Setting up the Backend

1. **Clone the repository**

  
   git clone [https://github.com/Leminar/Course-app.git]

   cd [courses-app]
   

2. **Install dependencies**

   Navigate to the backend directory and install the necessary packages.


   npm install
  

3. **Set up environment variables**

   Create a `.env` file in the root of the backend directory. Add the following environment variables:

   
   MONGO_URI=mongodb://127.0.0.1:27017/courses
   SESSION_SECRET=2222
   

4. **Run the server**

  
   npm start
   

   The server will start running on `http://localhost:5000`.

### Setting up the Frontend

1. **Navigate to the frontend directory**

   
   cd course-frontend
 

2. **Install dependencies**

   
   npm install
 

3. **Run the React app**

 
   npm start
   

   The application will open in your default web browser at `http://localhost:3000`.

## Usage

- **Register/Log In**: To create, edit, or delete courses, a user must be registered and logged in.
- **Viewing Courses**: Any visitor can view the list of courses available.
- **Managing Courses**: Logged-in users can add new courses, edit, or delete their courses from the list.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js, bcrypt.js
- **Frontend**: React, HTML, CSS

# API Documentation
# API Documentation

## User Authentication and Registration

### Register a User

- **POST /api/register**

Registers a new user.

**Request Body:**

- `username` (string): User's username.
- `password` (string): User's password.

**Response:**

- 302 Redirect to the login page on success.
- 500 Internal Server Error on failure.

### User Login

- **POST /api/login**

Authenticates a user and issues a JWT token.

**Request Body:**

- `username` (string): User's username.
- `password` (string): User's password.

**Response:**

- 200 OK on successful login.
- 401 Unauthorized on failed login.
- JSON response with a JWT token on success.

**Headers:**

- `Authorization` (string): Bearer token with the JWT for protected routes.

### User Logout

- **POST /api/logout**

Logs out the authenticated user.

**Response:**

- 200 OK on successful logout.
- 401 Unauthorized if not logged in.

## Course Management

### Get All Courses

- **GET /api/courses**

Retrieves a list of all courses.

**Response:**

- JSON array containing course objects on success.
- 500 Internal Server Error on failure.

### Get a Course by ID

- **GET /api/courses/:id**

Retrieves a specific course by its ID.

**Response:**

- JSON object containing course details on success.
- 404 Not Found if the course with the provided ID is not found.
- 500 Internal Server Error on failure.

### Create a Course

- **POST /api/courses**

Creates a new course.

**Request Body:**

- `name` (string): Course name.
- `teacher` (string): Teacher's name.
- `description` (string): Course description.
- `semester` (string): Semester information.
- `timing` (string): Course timing.
- `classNumber` (string): Class number.
- `isFull` (boolean): Indicates if the course is full.

**Response:**

- 201 Created on success, with the created course object.
- 500 Internal Server Error on failure.

### Update a Course by ID

- **PUT /api/courses/:id**

Updates a course by its ID.

**Request Body:**

Updated course details (same as course creation).

**Response:**

- 200 OK on success, with the updated course object.
- 404 Not Found if the course with the provided ID is not found.
- 500 Internal Server Error on failure.

### Delete a Course by ID

- **DELETE /api/courses/:id**

Deletes a course by its ID.

**Response:**

- 200 OK on successful deletion.
- 404 Not Found if the course with the provided ID is not found.
- 500 Internal Server Error on failure.
