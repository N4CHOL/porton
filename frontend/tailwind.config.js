/** @type {import('tailwindcss').Config} */
export default {
  content: [
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
        'custom-black':"#121416"
      },
    },
  },
  plugins: [],
}

