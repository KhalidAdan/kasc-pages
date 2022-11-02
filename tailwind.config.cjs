/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // https://coolors.co/589bc7-eff7f6-499167-827081-070707
      colors: {
        // carolina blue
        "carolina-blue-50": "#94BFDB",
        "carolina-blue-100": "#85B6D6",
        "carolina-blue-200": "#75ACD1",
        "carolina-blue-300": "#66A3CC",
        "carolina-blue-400": "#94BFDB",
        "carolina-blue-500": "#589BC7",
        "carolina-blue-600": "#4791C2",
        "carolina-blue-700": "#3D87B8",
        "carolina-blue-800": "#387BA8",
        "carolina-blue-900": "#337099",

        // onyx
        "onyx-50": "#5C5C5C",
        "onyx-100": "#525252",
        "onyx-200": "#474747",
        "onyx-300": "#585D5F",
        "onyx-400": "#3D3D3D",
        "onyx-500": "#333333",
        "onyx-600": "#292929",
        "onyx-700": "#1F1F1F",
        "onyx-800": "#141414",
        "onyx-900": "#070707",

        // mint cream
        "mint-cream": "#F1F7ED",

        //old lavender
        "old-lavender": "#827081",

        // middle green
        "middle-green": "#499167",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
