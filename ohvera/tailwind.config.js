/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        anthrazit: '#14161A',
        tiefblau: '#1B2230',
        offwhite: '#F5F6F7',
        weiss: '#FFFFFF',
        grau: {
          DEFAULT: '#8A9099',
          // Abgedunkelte Variante desselben Neutraltons – nur nötig,
          // damit Sekundärtext auf hellem Grund den AA-Kontrast erreicht.
          stark: '#5A6069',
        },
        elektroblau: {
          DEFAULT: '#1B57FF',
          tief: '#1442CC',
        },
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        weich: '0 1px 2px rgba(20, 22, 26, 0.04), 0 12px 32px -12px rgba(20, 22, 26, 0.14)',
        'weich-lg': '0 2px 4px rgba(20, 22, 26, 0.05), 0 28px 60px -24px rgba(20, 22, 26, 0.22)',
        dunkel: '0 20px 60px -24px rgba(0, 0, 0, 0.7)',
      },
      maxWidth: {
        lesbar: '34rem',
      },
      aspectRatio: {
        hochformat: '9 / 16',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [],
};
