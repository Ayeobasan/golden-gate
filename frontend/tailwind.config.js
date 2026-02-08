/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			lacquerRed: "#8B1E1E",
  			pastryGold: "#D4AF37",
  			steamedWhite: "#F9F7F2",
  			warmBeige: "#F0EBE0",
  			oolongTea: "#2C2420",
  			textMuted: "#6B5D55",
  			jadeGreen: "#2F5C56",
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			playfair: ['"Playfair Display"', 'serif'],
  			manrope: ['Manrope', 'sans-serif'],
  			dancing: ['"Dancing Script"', 'cursive'],
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};