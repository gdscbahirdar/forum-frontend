import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

const config = [
  js.configs.recommended,

  eslintConfigPrettier,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];

export default config;
