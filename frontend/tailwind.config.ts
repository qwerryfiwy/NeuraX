import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        perspective: {
    '1000': '1000px',
  },
  transformOrigin: {
    'center': 'center',
  },
      colors: {
  background: '#0e0e10',
  surface: '#0f1c2e',
  deep: '#060f1b',
  accent: '#6c47ff',
  neon: '#00ffe7',
  muted: '#bbbbbb',
},
    },
  },
  plugins: [],
};

export default config;
