import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", "build/", "dist/", "public/"], // Adicione 'build/' aqui
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react/jsx-uses-react": "error", // ✅ Essencial para o ESLint v9 entender o uso
      "react/jsx-uses-vars": "error", // ✅ Essencial para validar as variáveis no JSX
      "react/react-in-jsx-scope": "off",
    },
  },
];
