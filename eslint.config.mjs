import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "public/**"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  // 2. Configuração específica para JEST
  {
    files: ["**/*.spec.js", "**/*.test.js"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Forma mais limpa de puxar os globais do Jest
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "jest/no-disabled-tests": "warn",
    },
  },
  prettierConfig,
]);
