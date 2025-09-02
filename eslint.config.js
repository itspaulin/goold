import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Configuração base do ESLint
  js.configs.recommended,

  // Configurações do TypeScript ESLint
  ...tseslint.configs.recommended,

  {
    // Arquivos que serão verificados
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    languageOptions: {
      // Configurar para Node.js ao invés de browser
      globals: {
        ...globals.node,
        ...globals.es2021,
      },

      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },

    rules: {
      // Regras customizadas para seu projeto
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  {
    // Ignorar arquivos específicos
    ignores: ["node_modules/**", "dist/**", "*.js", "*.d.ts", "coverage/**"],
  },
];
