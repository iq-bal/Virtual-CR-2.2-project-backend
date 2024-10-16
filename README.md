Here is the correctly formatted markdown:

# Student Management System API

This is a RESTful API for a Student Management System built with Node.js, Express, MongoDB, and JWT for authentication. The API provides features for handling student profiles, assignments, class tests, lab quizzes, schedules, and user authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Profile Management](#profile-management)
  - [Class Tests](#class-tests)
  - [Assignments](#assignments)
  - [Lab Quizzes](#lab-quizzes)
  - [Routine](#routine)
  - [Attendance](#attendance)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Registration, login, and token-based authentication using JWT.
- **Profile Management**: CRUD operations on student profiles.
- **Class Tests, Assignments, and Lab Quizzes**: Create, retrieve, update, and delete class tests, assignments, and lab quizzes.
- **Routine Management**: CRUD operations on academic routines.
- **Attendance Tracking**: Attendance management for students.
- **File Upload**: Upload and update profile pictures.
- **Protected Routes**: Ensure certain routes are only accessible to authorized users.

## Prerequisites

- Node.js (v14.x or higher)
- MongoDB (running locally or via MongoDB Atlas)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/student-management-api.git
   cd student-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and add the necessary environment variables (see below).

4. Run the server:
   ```bash
   npm start
   ```

## Environment Variables

The following environment variables are required for the API to work:

- `ACCESS_TOKEN_SECRET`: Secret key for JWT access tokens.
- `REFRESH_TOKEN_SECRET`: Secret key for JWT refresh tokens.
- `MONGO_URI`: MongoDB connection string.

Example `.env` file:

```
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
MONGO_URI=mongodb://localhost:27017/studentdb
```

## API Endpoints

### Authentication

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/register`     | Register a new user.     |
| POST   | `/login`        | Login and get JWT tokens.|
| POST   | `/refresh`      | Refresh the access token.|
| DELETE | `/logout`       | Logout and invalidate the refresh token.|

### Profile Management

| Method | Endpoint              | Description                            |
|--------|-----------------------|----------------------------------------|
| GET    | `/profile`             | Get the authenticated user's profile. |
| PATCH  | `/profile`             | Update the user's profile.            |
| PATCH  | `/profile/imageurl`    | Update profile picture by URL.        |
| PATCH  | `/upload`              | Upload a profile picture via file.    |

### Class Tests

| Method | Endpoint                           | Description                               |
|--------|------------------------------------|-------------------------------------------|
| GET    | `/classtest`                       | Get all class tests.                      |
| POST   | `/classtest`                       | Create a new class test.                  |
| DELETE | `/classtest/:objectId/:userId`     | Delete a class test (authorized user).    |

### Assignments

| Method | Endpoint                           | Description                               |
|--------|------------------------------------|-------------------------------------------|
| GET    | `/assignment`                      | Get all assignments.                      |
| POST   | `/assignment`                      | Create a new assignment.                  |
| DELETE | `/assignment/:objectId/:userId`    | Delete an assignment (authorized user).   |

### Lab Quizzes

| Method | Endpoint                           | Description                               |
|--------|------------------------------------|-------------------------------------------|
| GET    | `/labquiz`                         | Get all lab quizzes.                      |
| POST   | `/labquiz`                         | Create a new lab quiz.                    |
| DELETE | `/labquiz/:objectId/:userId`       | Delete a lab quiz (authorized user).      |

### Routine

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/routines`                | Get the routines by section.   |
| POST   | `/routines`                | Create a new routine.          |
| PATCH  | `/routines/:sec`           | Update a routine by section.   |
| DELETE | `/routines/:sec`           | Delete a routine by section.   |

### Attendance

| Method | Endpoint                             | Description                                  |
|--------|--------------------------------------|----------------------------------------------|
| PATCH  | `/attendance/:logic/:courseCode`      | Update attendance for a specific course.     |

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
```

This should now display correctly on GitHub or any markdown viewer. Let me know if you need any more adjustments!
