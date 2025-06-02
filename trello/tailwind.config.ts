import type { Config } from 'tailwindcss'

const config: Config = {
  // darkMode: "class",
  content: [
    './src/pages/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{html,js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',

  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};

export default config;