/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
        // "../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        // "../../storage/framework/views/*.php",
        // "../**/*.blade.php",
        // "../**/*.js",
        // "../**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                nunito: ['"Nunito Sans", sans-serif'],
            },
        },
    },
};
