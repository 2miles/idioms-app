### 1. Rename idioms-app to a temp name.

```zsh
cd ~/Code/Github mv idioms-app idioms-app-old
```

### 2. Create new vite project

```zsh
npm create vite@latest idioms-app
```

### 3. Merge .gitignore files

I copied and pasted the old `.gitignore` to the new one, removing any redundant lines.

### 4. Delete all package-lock.json files

### 5. Copy .git, client, data, notes, server, and README.md (as README_old.md), folders over

```zsh
cp -R ~/Code/Github/idioms-app-old/.git ~/Code/Github/idioms-app
```

```zsh
cp -R ~/Code/Github/idioms-app-old/README.md ~/Code/Github/idioms-app/README_old.md
```

```zsh
cp -R ~/Code/Github/idioms-app-old/client ~/Code/Github/idioms-app/client
```

```zsh
cp -R ~/Code/Github/idioms-app-old/data ~/Code/Github/idioms-app/data
```

```zsh
cp -R ~/Code/Github/idioms-app-old/notes ~/Code/Github/idioms-app/notes
```

```zsh
cp -R ~/Code/Github/idioms-app-old/server ~/Code/Github/idioms-app/server
```

### 7. Update the root package.json.

#### Remove from package.json:

```json
"version" "1.0.0":,
"description": "",
"main": "index.js",

"scripts": {
  "test": "echo \"Error: no test specified\" && 1"
}
```

#### Add to package.json:

```json
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "eslint": "^9.13.0"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ]
  },
```

### 8. Update the client/package.json.

#### Remove from client/package.json:

```json
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "install": "^0.13.0",
    "npm": "^10.9.0",
    "react-scripts": "5.0.1",
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
  },
  "eslintConfig": { //this is moving to client
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ]
  }
```

#### Add to client/package.json:

```json
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "vite": "^5.4.9",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.13",
    "globals": "^15.11.0",
    "typescript-eslint": "^8.10.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vite test"
  }
```

### 9. Mange tsconfig.json files.

The root folder should have a `tsconfig.json`. The client and server will have `tsconfig.app.json` and `tsconfig.node.json` files respectively.

Merge the old `client/tsconfig.json` into `client/tsconfig.app.json` and delete the former, take care of `server/tsconfig.json` similarly.

### 10. Update index.html

- (Merge old `client/public/index.html` into `client/index.html`).
- Remove any `%PUBLIC_URL%` from all the references.
- Add `<script type="module" src="/src/main.tsx"></script>` to the body tag.
- Remove cra comments
- Organize the links

### 10. Move files int0 client directory

Move the following files and folders into the client directory

- `index.html`
- `Assets/`
- Merge `Public/` folders into `client/Public`

### 11. Install dependencies

#### Install root dependencies

```zsh
cd Root/of/project
npm install
```

#### Install server dependencies

```zsh
cd server
npm install
```

#### Install client dependencies

```zsh
cd client
npm install
```

### 12. Fix start script

I got a bunch of import errors when trying to run the server.

I encountered errors when starting the TypeScript server using nodemon and ts-node due to conflicts between the TypeScript module import syntax and the configuration options used.

TypeScript Import Errors: errors indicating that certain modules (like express, dotenv, etc.) could not be default-imported unless the esModuleInterop flag was enabled.

This is because some CommonJS modules are being imported as ES modules without the appropriate compatibility options set in your TypeScript configuration.

Using the `--loader ts-node/esm` option in the start script can cause conflicts with module imports because it changes how modules are loaded, leading to the aforementioned import errors.

I changed teh script from:

```json
"start": "nodemon --loader ts-node/esm --project tsconfig.node.json --experimental-specifier-resolution=node server.ts"
```

to:

```json
"start": "nodemon --exec 'npx ts-node --esm --project tsconfig.node.json --experimental-specifier-resolution=node' server.ts"
```

By using --exec, you explicitly define that nodemon should use ts-node to execute your TypeScript files. This avoids issues related to module loaders since ts-node handles TypeScript compilation and execution without needing the --loader flag.

## Misc notes

- Make sure your Vite project is configured to run both the client and server (as mentioned earlier, you might need to create separate start:client and start:server scripts).

- (server/package.json) If you are using ES modules ("type": "module"), ensure your imports and exports in your TypeScript files are compatible.
