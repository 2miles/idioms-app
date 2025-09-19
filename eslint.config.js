// import js from '@eslint/js';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       'simple-import-sort': simpleImportSort,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//       // 👇 Import sorting rules
//       'simple-import-sort/imports': 'warn',
//       'simple-import-sort/exports': 'warn',
//     },
//   },
// );

// import js from '@eslint/js';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       'simple-import-sort': simpleImportSort,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

//       // ✅ Custom import sort groups
//       'simple-import-sort/imports': [
//         'error',
//         {
//           groups: [
//             // External packages `react`, `react-dom`, etc.
//             ['^react', '^@?\\w'],
//             // Internal aliases like `@/components/...`
//             ['^@/'],
//             // Side effect imports (e.g. './styles.css')
//             ['^\\u0000'],
//             // Parent imports
//             ['^\\.\\.(?!/?$)', '^\\./?$'],
//             // Current directory imports
//             ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
//             // Style imports
//             ['^.+\\.s?css$'],
//           ],
//         },
//       ],
//       'simple-import-sort/exports': 'error',
//     },
//   },
// );

// eslint.config.js
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // ✅ Merge react-hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // ✅ React refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ✅ Import sort rules
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Built-in, react, and 3rd-party packages (including @auth0, @testing-library, etc.)
            ['^react', '^@(?!(/))', '^\\w'],

            // Internal alias imports using "@/..."
            ['^@/'],

            // Side-effect imports (e.g. styles)
            ['^\\u0000'],

            // Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // Current directory imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // Style imports (optional)
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
);
