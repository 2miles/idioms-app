## Create Docker images for the Node server and the Vite client

## Create a Dockerfile for the Node.js server:

```zsh
cd server

```

```dockerfile
# Use a Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

## Create Dockerfile for the Vite React Client

```dockerfile
# Use an official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose the port your Vite development server will use
EXPOSE 5173

# Run the Vite development server with hot-reloading
CMD ["npm", "run", "dev"]

```

## Create docker-compose file in the root

The `docker-compose.yml` file at the root level will define and manage both the server and client containers.

```yml
version: '3.8'

services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile.dev # Use the dev Dockerfile
    ports:
      - '3001:3001' # Map container port 3000 to host port 3000 (host:container)
    env_file:
      - ./server/.env # Load environment variables from server/.env
    environment:
      - NODE_ENV=development
    volumes:
      - ./server:/app # Bind mount for hot-reloading
      - /app/node_modules

  client:
    build:
      context: ./client
      dockerfile: Dockerfile.dev # Use the dev Dockerfile
    ports:
      - '5173:5173'
    environment:
      - NODE_ENV=development
    depends_on:
      - server
    volumes:
      - ./client:/app # Bind mount for hot-reloading
      - /app/node_modules
```

## Add .dockerignore

```
# node_modules
node_modules/
client/node_modules/
server/node_modules/

# Log files
*.log

# Environment files
.env
server/.env
client/.env

# Dockerfile and docker-compose.override.yml files
Dockerfile*
docker-compose.override.yml

# Git files
.git/
.gitignore

# Build artifacts (e.g., dist, build)
client/dist/
client/build/
server/dist/
server/build/

# IDE files
.vscode/

# Unnecessary system files
.DS_Store
```

## Module System Change: CommonJS for Docker Compatibility

To ensure compatibility with the Docker environment and certain dependencies, the module setting in tsconfig.node.json was changed from ESNext to CommonJS. This change aligns with Node.js's default module format, commonly expected by many back-end libraries and Docker configurations. Using CommonJS ensures that module imports and exports work reliably in the container environment.

## Update server package.json

### Change start script

```json
  "scripts": {
    "start": "nodemon --exec 'ts-node --project tsconfig.node.json' server.ts",
  },
```

## remove:

```json
{
  "type": "module"
}
```
