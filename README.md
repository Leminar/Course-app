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