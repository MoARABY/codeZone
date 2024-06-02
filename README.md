# CodeZone - Social Media Platform
CodeZone is a social media platform built using Node.js, Express, and MongoDB. It allows users to perform CRUD operations on users and posts, manage profiles, follow and unfollow other users, and like or unlike posts. The platform uses JWT for authentication, with tokens saved in cookies, and ensures security and logging with various tools.

## Features
- User Authentication: Users can register and log in, with passwords securely hashed using bcrypt. JWT tokens are used for authentication and are stored in cookies.
- User Management: Users can create, read, update, and delete their profiles. They can also follow and unfollow other users.
- Post Management: Users can create, read, update, and delete posts. They can like and unlike posts.
- Security: Implements CORS, Helmet for HTTP header security, and Cookie-Parser for parsing cookies.
- Rate Limiting: Prevents abuse by limiting the number of requests a user can make in a given timeframe.
- Logging: Logs system activities and saves logs to files for monitoring and debugging.
- Swagger Documentation: Provides API documentation with Swagger for easy testing and development.

## Technologies Used
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Authentication and Authorization: JWT, bcrypt
- Security: CORS, Helmet, Cookie-Parser
- Rate Limiting: express-rate-limit
- Logging: morgan, winston
- API Documentation: Swagger

## Middleware and Tools
- CORS: Handles Cross-Origin Resource Sharing.
- Helmet: Secures HTTP headers.
- Cookie-Parser: Parses cookies for JWT.
- Express-Rate-Limit: Limits repeated requests to public APIs and/or endpoints.
- Morgan & Winston: Logs requests and saves them to files.
- Swagger UI & Swagger Autogen: Generates and serves API documentation.

## Usage
- User Registration and Login:

Register a new user by sending a POST request to /api/users/register with the required user details.
Log in a user by sending a POST request to /api/users/login and receive a JWT token in a cookie.
Profile Management:

Access and update user profiles using the appropriate GET, PUT, and DELETE requests to /api/users/:id.
Following and Unfollowing Users:

Follow or unfollow users by sending POST requests to /api/users/:id/follow and /api/users/:id/unfollow.

- Post Management:

Create, read, update, and delete posts using the respective POST, GET, PUT, and DELETE requests to /api/posts.
Liking and Unliking Posts:

Like or unlike posts by sending POST requests to /api/posts/:id/like and /api/posts/:id/unlike.
API Documentation:

Access API documentation at /api-docs for interactive testing and exploration.


## License
This project is licensed under the MIT License. See the LICENSE file for details.
