# MegaExeTest

## Overview

MegaExeTest is a Node.js project built with TypeScript and Express.js, featuring session-based user authentication, and various functionalities for managing users, posts, and comments. The project also includes endpoints for upvoting and downvoting posts, viewing posts sorted by different criteria, and handling comments and replies.

## Features

- User authentication with sessions
- CRUD operations for posts
- Adding and managing comments and replies to posts
- Upvoting and downvoting posts
- Viewing posts with sorting and filtering options
- Middleware for authentication
- Error handling

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Log in a user
- `POST /api/users/logout`: Log out a user
- `GET /api/users/me`: Get authenticated user details

### Post Routes

- `POST /api/posts`: Create a new post
- `GET /api/posts`: Get all posts
- `GET /api/posts/:postId`: Get a single post by ID
- `PATCH /api/posts/:postId`: Update a post
- `DELETE /api/posts/:postId`: Delete a post
- `POST /api/posts/:postId/upvote`: Upvote a post
- `POST /api/posts/:postId/downvote`: Downvote a post

### Comment Routes

- `POST /api/comments`: Add a comment to a post
- `GET /api/comments/:postId`: Get comments for a specific post


### Challenges and Solutions

1. **TypeScript Type Issues**:
   - **Challenge**: Encountered several TypeScript type mismatches, especially when dealing with `RequestHandler` and session data.
   - **Solution**: Defined custom types and extended existing types to ensure type safety. For example, extended `express-session` to include `userId` in session data.

2. **Session Management**:
   - **Challenge**: Ensuring sessions were properly maintained and accessible across different parts of the application.
   - **Solution**: Verified session configuration and used middleware to access session data in routes. Created a helper function `assertIsDefined` to ensure session data is present before proceeding with requests.

3. **Nested References in MongoDB**:
   - **Challenge**: Managing nested references for comments and replies within posts.
   - **Solution**: Used Mongoose's `populate` method to fetch nested documents and ensure data integrity. Refactored the schema to maintain clarity and prevent circular references.

4. **Error Handling**:
   - **Challenge**: Handling errors gracefully and providing meaningful error messages to clients.
   - **Solution**: Implemented a global error handler to catch and format errors consistently. Used `createHttpError` to generate and manage HTTP errors.

5. **Code Organization**:
   - **Challenge**: Keeping the codebase organized and maintainable with increasing complexity.
   - **Solution**: Followed MVC architecture, separating concerns into controllers, models, and routes. Utilized utility functions for common tasks.

### Conclusion

Throughout the development of MegaExeTest, careful attention was given to maintaining code quality, handling errors gracefully, and ensuring type safety with TypeScript. By overcoming various challenges, including type mismatches and session management, a robust and scalable application was built. This project demonstrates the effective use of modern web development practices and tools, setting a strong foundation for future enhancements and features.
