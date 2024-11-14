# Idioms App

## Overview

This is a web application for exploring and managing idioms. Users can search through a table of idioms and view detailed information on each idiom. Built with a React frontend, Express and Node.js backend, and PostgreSQL database, the app provides a smooth and user-friendly experience for exploring idioms in a data-rich format.

## Features

- **Idiom Search**: Search and filter idioms through a data table.
- **Detail Pages**: Click on any idiom to view a detail page with additional information.
- **Responsive Design**: Optimized for both desktop and mobile.
- **Data Persistence**: Data is stored in a PostgreSQL database.
- **Modular Structure**: Easily extensible, with separate frontend and backend components.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Styled Components
- **Backend**: Node.js, Express, PostgreSQL
- **Styling**: Styled Components
- **Other Libraries**: Axios, SweetAlert2, Moment, React Router

#### Node Server Packages:

- `react`: A JavaScript library for building user interfaces.
- `cors`: Middleware for handling Cross-Origin Resource Sharing (CORS) in Node.js.
- `dotenv`: Loads environment variables from a .env file into process.env.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `morgan`: HTTP request logger middleware for Node.js.
- `pg`: Non-blocking PostgreSQL client for Node.js.

#### Client Packages:

- `axios`: Promise-based HTTP client for the browser and Node.js.
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: DOM-specific methods for React.
- `react-router-dom`: DOM bindings for React Router.
- `react-scripts`: Configuration and scripts for Create React App.
- `web-vitals`: Library for measuring web vitals and other performance metrics.

# Installation

You can run the project either with Docker or by setting it up locally.

## Prerequisites

- **Node.js**: Ensure that you have Node.js (version 18 or higher recommended).
- **Docker(optional)**: If using Docker, make sure Docker is installed and running.
- **PostgreSQL**: If running locally without Docker, you’ll need to have PostgreSQL installed.

### Clone the Repository:

```bash
git clone https://github.com/2miles/idioms-app.git
cd idioms-app
```

### Configure Environment Variables:

Before running the application, you'll need to set up your database connection. Right now I have it set up for two options:

- Supabase
- Local PostgreSQL Database

### Create a `.env` file in the server directory and set your PostgreSQL connection details.

```ts
PORT=3001

// Choose between local (1) or supabase (2).
// (true/false)
USE_SUPABASE=false

// Option 1
LOCAL_PSQL_HOST=localhost
LOCAL_PSQL_USER=postgres
LOCAL_PSQL_DATABASE=idioms_db
LOCAL_PSQL_PASSWORD=postgres
LOCAL_PSQL_PORT=5433

// Option 2
DB_URL_SUPABASE=postgresql://<username>:<password>@<host>:<port>/<database_name>
```

- Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with your Supabase database credentials.

- You can find these values in your Supabase project under `Settings > Database > Connection Pooling`.

## Run the Application (option 2, locally)

### Install Dependencies:

```bash
# Root directory:
npm install
cd client
npm install
cd ../server
npm install
```

From the root directory, start both the client and server with this single command:

```bash
npm start
```

## Run the Application (option 1, Docker)

### Build and Run Containers:

Use Docker Compose to build, start, and stop the containers.

```bash
docker-compose build
```

```bash
docker-compose up
```

```bash
docker-compose down
```

##

- Client: http://localhost:5173,
- Server API: http://localhost:3001.

## Scripts

### Root:

- `npm start`: Runs both frontend and backend concurrently.
- `npm run lint`: Lints the project.

### Client:

- `npm run dev`: Starts the frontend in development mode.
- `npm run build`: Builds the frontend for production.
- `npm run preview`: Previews the production build.

Server:

- `npm start`: Starts the backend server.

Project Structure

```bash
idioms-app
│
├── client      # Frontend (React + Vite) - This folder contains the client-side React app built using Vite
│ └── src       # React components, pages, and styles - All source code for the React application
│ └── tsconfig.app.json  # TypeScript configuration specific to the frontend (React app)
│ └── vite.config.ts      # Vite configuration file, including plugins, aliases, and environment variables
│ └── Dockerfile.dev      # Dockerfile for setting up the development environment for the React frontend
│ └── package.json        # Contains dependencies, scripts, and other configurations for the React app
│
├── data        # SQL files to rebuild database - Contains SQL scripts to create tables and seed data
│ └── idioms_db_backup_24-10-06.sql  # SQL script to create necessary tables in the database
│
├── notes       # Personal notes, documentation - This folder contains additional project notes and documentation
│
├── server      # Backend (Node.js + Express) - Contains the server-side Node.js code
│ ├── db           # Database connection and queries
│ │ └── index.ts   # Establishes the connection to the database using `pg` and exports a pool or client
│ └── server.ts    # Main entry point of the backend Express server. Sets up routes, middleware, and starts the server
│ └── .env         # Environment variables for backend (e.g., database URL, API keys)
│ └── tsconfig.node.json  # TypeScript configuration for backend code (Node.js)
│ └── Dockerfile.dev      # Dockerfile to build and run the Node.js backend in a development environment
│ └── package.json        # Dependencies and scripts for the backend (Node.js server)
│
├── docker-compose.yml # Docker Compose configuration to define and run multi-container Docker applications
├── eslint.config.js   # ESLint configuration to enforce code quality and consistency
├── .gitignore         # Specifies which files/folders to ignore in version control (e.g., node_modules)
├── .dockerignore      # Specifies which files/folders to ignore in the Docker build context (e.g., .git, node_modules)
├── tsconfig.json      # Main TypeScript configuration file, shared by both frontend and backend
├── package.json       # Root package.json to manage dependencies that are used across both frontend and backend
└── README.md          # Project documentation file with instructions on how to set up and use the project
```

---

---

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
