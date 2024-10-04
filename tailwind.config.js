/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './app.vue',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    fontWeight: {
      100: '100',
      200: '200',
      300: '300',
      400: '400',
      500: '500',
      600: '600',
      700: '700',
      800: '800',
      900: '900',
    },
    screens: {
      320: '320px',
      // => @media (min-width: 320px) { ... }

      400: '400px',
      // => @media (min-width: 400px) { ... }

      480: '480px',
      // => @media (min-width: 480px) { ... }

      640: '640px',
      // => @media (min-width: 640px) { ... }

      768: '768px',
      // => @media (min-width: 768px) { ... }

      800: '800px',
      // => @media (min-width: 800px) { ... }

      968: '968px',
      // => @media (min-width: 968px) { ... }

      1024: '1024px',
      // => @media (min-width: 1024px) { ... }

      1440: '1440px',
      // => @media (min-width: 1440px) { ... }

      1680: '1680px',
      // => @media (min-width: 1680px) { ... }
    },
  },
  plugins: [require('tailwindcss-primeui')],
}
