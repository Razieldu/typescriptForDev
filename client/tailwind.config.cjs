/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        spacing: {
          'custom':'19.5rem', // 定义 custom-mt 的尺寸
          "mt18":"4rem"
        },
      },
    },
    plugins: [],
  };
  