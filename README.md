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

