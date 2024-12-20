# Idioms App

## Overview

This is a web application for managing a list of idioms. The idioms are presented as a pagenated data table that can be searched, filtered, and sorted. For each idiom there is a detail page that can be accessed by clicking on any idiom in the table.

## Features

- **Store Idioms**: Add, edit, delete idioms.
- **Idiom Search**: Search and filter idioms. View through a data table.
- **Detail Pages**: Click on any idiom to view a detail page with additional information.
- **Responsive Design**: Optimized for both desktop and mobile.
- **Data Persistence**: Data is stored in a PostgreSQL database.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, PostgreSQL
- **Styling**: Styled Components, Bootstrap
- **Other Libraries**: Axios, SweetAlert2, Moment, React Router

### Node Server Packages:

- `react`: A JavaScript library for building user interfaces.
- `cors`: Middleware for handling Cross-Origin Resource Sharing (CORS) in Node.js.
- `dotenv`: Loads environment variables from a .env file into process.env.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `morgan`: HTTP request logger middleware for Node.js.
- `pg`: Non-blocking PostgreSQL client for Node.js.

### Client Packages:

- `typescript`
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: DOM-specific methods for React.
- `react-router-dom`: DOM bindings for React Router.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `styled-components`: library for styling React components using CSS-in-JS with scoped styles
- `moment`: Library for parsing, validating, and formatting dates and times.
- `react-datetime`: React date and time picker component
- `sweetalert2`: Library for creating customizable alert popups.

## Prerequisites

- Node.js
- Docker (optional)
- PostgreSQL

## Installing and Running

### Clone the Repository:

```bash
git clone https://github.com/2miles/idioms-app.git
cd idioms-app
```

### Set up database

Create a PostgreSQL database from the .sql files in /data.
There is one with just the table schemas and there is one that is also populated with data.

#### (option 1) PgAdmin GUI

1. Open PgAdmin and log in to your PostgreSQL server.
2. Create a new, empty database:
   - Click on Databases in the left sidebar.
   - Select Create > Database and give it a name.
3. Click on the newly created database and select Restore.
4. In the Restore dialog:
   - Select Format as "Custom or tar".
   - For Filename, click the file browser button and choose your .sql file.
5. Adjust any other settings as needed.
6. Click Restore. This should populate the new database with the data from your .sql file.

#### (option 2) Command Line

1. Connect to your PostgreSQL server

```bash
psql -U username -W
```

2. Create an empty database to import into:

```bash
createdb -U username new_database
```

3. Import the .sql file:

```bash
psql -U username -d new_database -f path/to/yourfile.sql
```

### Environment Variables:

Before running the application, you'll need to set up your database connection. Right now I have it set up so you can choose between using either Supabase or a local Postgres database.

### Create the `.env` file with PostgreSQL connection details.

In the server directory use the following as a template:

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

## Running the program

If you have docker you can use that or you can install the dependencies yourself and use the start command.

### (option 1) Docker

Use Docker Compose to run the application in containers.

1. Build the Docker containers:

```bash
docker-compose build
```

2. Start the containers:

```bash
docker-compose up
```

To stop the containers:

```bash
docker-compose down
```

### (option 2) Locally

Now that you have the project cloned and your .env set up.

1. Install the dependencies:

```bash
# Root directory:
npm install

# Client (React frontend):
cd client
npm install

# Server (Node.js backend):
cd ../server
npm install
```

2. Run both the client and server:

```bash
   npm start
```

After running the app, you can access the client at `http://localhost:5173` and the backend API at `http://localhost:3001`.

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

## Project Structure

```bash
idioms-app
│
├── client               # Frontend (React + Vite) - Client-side React app built using Vite
│ └── src                # React components. All source code for the React application
│ └── tsconfig.app.json  # TypeScript configuration for frontend
│ └── vite.config.ts     # Vite configuration file, including plugins, aliases, and environment variables
│ └── Dockerfile.dev     # Dockerfile for setting up the development environment for the React frontend
│ └── package.json       # Dependencies, scripts, and other configurations for the React app
│
├── data                 # SQL files to rebuild database.
│ └── idioms_db_backup_24-10-06.sql  # SQL script to create necessary tables in the database
│
├── notes                # Personal notes, documentation
│
├── server               # Backend (Node.js + Express) - Contains the server-side Node.js code
│ ├── db                 # Database connection and queries
│ │ └── index.ts         # Establishes connection to the database using `pg` and exports a pool or client
│ └── server.ts          # Main entry point of the Express server. Sets up routes, middleware, starts server
│ └── .env               # Environment variables for backend (e.g., database URL, API keys)
│ └── tsconfig.node.json # TypeScript configuration for backend code (Node.js)
│ └── Dockerfile.dev     # Dockerfile to build and run the Node.js backend in a development environment
│ └── package.json       # Backend dependencies and scripts
│
├── docker-compose.yml   # Docker Compose configuration to define and run multi-container Docker applications
├── eslint.config.js     # ESLint configuration to enforce code quality and consistency
├── .gitignore           # Specifies which files/folders to ignore in version control
├── .dockerignore        # Specifies which files/folders to ignore in the Docker build context
├── tsconfig.json        # Main TypeScript configuration file
├── package.json         # Root dependencies and scripts
└── README.md            # Project documentation
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
