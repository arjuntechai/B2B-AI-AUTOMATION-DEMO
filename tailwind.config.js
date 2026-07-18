/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#0A0A0A',
          800: '#111111',
          700: '#141414',
          600: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#4A6FA5',
          soft: '#5B7FB8',
          dim: '#3A5A85',
        },
        heading: '#F0F0F0',
        body: '#A0A0A0',
        muted: '#6B6B6B',
        line: '#242424',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.02em',
        wider: '0.08em',
        widest: '0.18em',
      },
      maxWidth: {
        prose: '640px',
        form: '560px',
      },
    },
  },
  plugins: [],
};
