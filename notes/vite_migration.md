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

### 6. Add old stuff to root package.json.

Add `"start": "nodemon server.js"` to `"scripts"`

### 7. Manage all the package.json files.

### 8. Add the following to root package.json

```json
  "repository": {
    "type": "git",
    "url": "git+https://github.com/2miles/idioms-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/2miles/idioms-app/issues"
  },
  "homepage": "https://github.com/2miles/idioms-app#readme"
```

### 9. Move all the devDependences **except** for the following from package.json to client/package.json

```json
    "@eslint/js": "^9.13.0",
    "eslint": "^9.13.0",
    "vite": "^5.4.9"

```

### 10. Remove the following dependencies from client/package.json

```json
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
```

Vite and CRA do testing differently. And I'm not even testing yet.

### 11. Remove `react-scripts` dependency.

This package is specific to Create React App (CRA) and is not needed for Vite.

### 12 Add the following to client/package.json

```json
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "vite": "^5.4.9",
    "eslint": "^9.13.0",
    "@eslint/js": "^9.13.0"
  },
```

### 13 Cange client scripts to the following

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vite test"
  },
```

### 13 Change eslint config to the following

```json
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ]
  },
```

### Mange tsconfig.json files.

The root folder should have a `tsconfig.json`. The client and server will have `tsconfig.app.json` and `tsconfig.node.json` files respectively.

Merge the old `client/tsconfig.json` into `client/tsconfig.app.json` and delete the former, take care of `server/tsconfig.json` similarly.

### Move misc files int0 client directory

Move the following files and folders into the client directory

- `index.html` (Merge old `client/public/index.html` into `client/index.html`). Remove any %PUBLIC_URL% from all the references.
- `Assets/`
- Merge `Public/` folders into `client/Public`

### 5. Install client dependencies

### 5. Install root dependencies

## Misc notes

- Make sure your Vite project is configured to run both the client and server (as mentioned earlier, you might need to create separate start:client and start:server scripts).

- (server/package.json) If you are using ES modules ("type": "module"), ensure your imports and exports in your TypeScript files are compatible.
