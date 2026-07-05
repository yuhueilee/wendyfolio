/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#F4FCFB',
        tint: '#E9F2FA',
        ink: '#243C4C',
        accent: '#5289AD',
        'accent-dark': '#3A647F',
        muted: '#698696',
        body: '#4C616D',
        'body-dark': '#37505E',
        line: '#ACBCBF',
        'card-line': '#D6E3E6',
        'dark-line': '#3B5E76',
        'dark-hover': '#2B4A5E',
        'dark-muted': '#88ADC1',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      screens: {
        wide: '800px',
      },
      boxShadow: {
        glass: '0 6px 20px rgba(36, 60, 76, 0.10)',
        float: '0 6px 20px rgba(36, 60, 76, 0.14)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease both',
      },
    },
  },
  plugins: [],
}
