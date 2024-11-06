/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./room/**/*.{js,jsx,ts,tsx}",  // Include all files in the 'room' directory
      "./src/**/*.{js,jsx,ts,tsx}",   // Include all files in the 'src' directory
      "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the 'components' directory
      "./screens/**/*.{js,jsx,ts,tsx}", // Include all files in the 'screens' directory
      "./**/*.{js,jsx,ts,tsx}", // Include all files across the entire project
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  