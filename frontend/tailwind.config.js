/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-white': '#9FADBC', // Define your custom color
        'custom-hover': '#38414A', 
        'card-background': '#1D2125',
        'urgente':"#CA3521",
        'media':"#82B536",
        'custom-black':"#121416",
        'custom-white-grey':"#C7D1DB"
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
        // You can add more custom breakpoints here if needed
        '4xl': '1920px', // Example of a custom breakpoint
      },
    },
  },
  plugins: [],
}

