import config from "eslint-config-xo";
import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
    {
        files: ["resources/js/**/*.jsx"],
        rules: {
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": "off",
        },
    },
]);
