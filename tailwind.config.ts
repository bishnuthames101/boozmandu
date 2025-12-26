import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#111111',
        darker: '#0A0A0A',
        amber: {
          50: '#FFF8E6',
          100: '#FFEFC4',
          200: '#FFE299',
          300: '#FFD066',
          400: '#FFBF3F',
          500: '#FF9900', // primary amber
          600: '#E68A00',
          700: '#B36D00',
          800: '#805000',
          900: '#4D3000',
        },
        gold: {
          50: '#FBF7E4',
          100: '#F5EBBD',
          200: '#EFDF96',
          300: '#E9D36F',
          400: '#E3C748',
          500: '#D4AF37', // primary gold
          600: '#B39018',
          700: '#8C7012',
          800: '#66500D',
          900: '#3F3008',
        },
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#4CAF50',
          600: '#43A047',
        },
        warning: {
          50: '#FFF8E1',
          100: '#FFECB3',
          500: '#FFC107',
          600: '#FFB300',
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          500: '#F44336',
          600: '#E53935',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to right, rgba(17, 17, 17, 0.9), rgba(17, 17, 17, 0.7)), url("/src/assets/hero-bg.jpg")',
      },
    },
  },
  plugins: [],
}

export default config
