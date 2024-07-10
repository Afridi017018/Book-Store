```markdown
# Bookstore API Documentation

Welcome to the documentation for the Bookstore API. This API is built with TypeScript, Node.js, Express, and MySQL. It provides endpoints to manage books and authors in a bookstore.



## Introduction

This API allows you to perform CRUD operations on books and authors in a bookstore database. It uses TypeScript for server-side development, Express for handling HTTP requests, and MySQL for database operations.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14.x or higher)
- npm (Node Package Manager)
- MySQL Server

## Getting Started

Follow these steps to set up and run the project locally:

### Installing Dependencies

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd bookstore-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Setting Up the Database

**Database Configuration:**

- Create a MySQL database for the project.
- Update the database configuration in `src/models/db.ts` with your MySQL connection details.

**Database Schema:**

Use the following SQL script to create the necessary tables:

```sql
-- Create books table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    published_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Create authors table
CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    birthdate DATE
);
```

Save this script as `create-schema.sql`.

### Starting the Server

Start the server using the following command:

```bash
npm start
```

The server will run at http://localhost:3000 by default.

## API Endpoints

### Books

- **GET** `/api/books`: Get all books.
- **GET** `/api/books/:id`: Get a book by ID.
- **POST** `/api/books`: Create a new book.
- **PUT** `/api/books/:id`: Update a book by ID.
- **DELETE** `/api/books/:id`: Delete a book by ID.

### Authors

- **GET** `/api/authors`: Get all authors.
- **GET** `/api/authors/:id`: Get an author by ID.
- **POST** `/api/authors`: Create a new author.
- **PUT** `/api/authors/:id`: Update an author by ID.
- **DELETE** `/api/authors/:id`: Delete an author by ID.

## Testing the API

You can use tools like Postman to test the API endpoints:

1. Open Postman and import the collection JSON file provided (`bookstore-api.postman_collection.json`).
2. Use different HTTP methods (GET, POST, PUT, DELETE) to interact with the API endpoints.

That's it! You are now ready to use the Bookstore API. For any issues, please contact [your-email@example.com](mailto:your-email@example.com).
```

