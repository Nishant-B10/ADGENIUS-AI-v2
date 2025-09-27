/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0A0A0B',
        'off-white': '#F8F9FA',
        'gold': '#D4AF37',
        'cream': '#E5E5E7',
        // You can add other custom colors from your globals.css here
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        serif: ['"Times New Roman"', 'serif'], // Example serif font
      },
    },
  },
  plugins: [],
}
