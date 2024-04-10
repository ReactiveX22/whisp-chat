import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#e1e8f4',
        background: '#05080d',
        primary: '#9fb3da',
        secondary: '#543180',
        accent: '#a661c3',
      },
      animation: {
        enter: 'animate-in slide-in-from-top duration-500',
        leave: 'animate-out fade-out duration-500',
      },
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
export default config;
