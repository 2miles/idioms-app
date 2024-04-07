## Idiom App Documentation

### Introduction

This documentation provides a guide for setting up and running a React application with a server-side component. The application consists of two main parts: the server directory and the client directory.

### Prerequisites

Node.js and npm installed on your machine.

PostgreSQL installed on your machine.

### Dependencies

#### Node Server Packages:

- `react`: A JavaScript library for building user interfaces.
- `cors`: Middleware for handling Cross-Origin Resource Sharing (CORS) in Node.js.
- `dotenv`: Loads environment variables from a .env file into process.env.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `morgan`: HTTP request logger middleware for Node.js.
- `nodemon`: Utility that monitors for changes in your source code and automatically restarts the server.
- `pg`: Non-blocking PostgreSQL client for Node.js.

#### Node Client Packages:

- `axios`: Promise-based HTTP client for the browser and Node.js.
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: DOM-specific methods for React.
- `react-router-dom`: DOM bindings for React Router.
- `react-scripts`: Configuration and scripts for Create React App.
- `web-vitals`: Library for measuring web vitals and other performance metrics.

### Installation

Clone the repository from GitHub:

```bash
git clone <repository_url>
```

Navigate into the project directory:

```bash
cd <project_directory>
```

### Setting Up the Database

Install PostgreSQL on your machine if you haven't already.

Create a new PostgreSQL database. You can do this using a tool like pgAdmin or the following command in your terminal:

```bash
createdb my_database_name
```

Create a `.env` file in the server directory and add your database connection information:

```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=my_username
    DB_PASSWORD=my_password
    DB_DATABASE=my_database_name
```

Replace `my_username`, `my_password`, and `my_database_name` with your PostgreSQL credentials.

### Setting Up the Server

Navigate into the server directory, install the server dependencies, and start the server:

```bash
cd server;
npm install;
npm start;
```

The server will run on the specified port (usually 3000).

### Setting Up the Client

Navigate into the client directory, install the server dependencies, and start the server:

```bash
cd client;
npm install;
npm start;
```

This will launch the React development server and open the application in your default web browser.

### Usage

Once both the server and client are running, you can interact with the React application in your web browser. Any changes made to the client-side code will automatically trigger a hot reload, allowing you to see the changes in real-time.
